import * as faceapi from 'face-api.js';
import { getProfileData } from './fb_firestore';

const loadModals = async() => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
};

const loadLabeledImages = async() => {
    const profiles = await getProfileData();
    let labeledFaceDescriptors : Array<faceapi.LabeledFaceDescriptors> = [];

    for(const profile of profiles){
        const label = profile.fName + ' ' + profile.lName;
        let faceDescriptors : Array<Float32Array> = [];

        for(const imageRef of profile.imageRefs){
            const img = await faceapi.fetchImage(imageRef);
            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
            if(detections != null){
                faceDescriptors.push(detections.descriptor);
            }
        }

        if(faceDescriptors.length > 0){
            labeledFaceDescriptors.push(new faceapi.LabeledFaceDescriptors(label, faceDescriptors));
        }
    }

    return labeledFaceDescriptors;
};

const cropImage = async(file : File) => {
    try{
        const img = await faceapi.bufferToImage(file)

        const result = await faceapi.detectAllFaces(img);

        if(result == undefined) throw new Error("No face detected");

        const faces = await faceapi.extractFaces(img, result);
        const blobsPromises: Promise<Blob | null>[] = [];

        for(const face of faces){
            const blobPromise = new Promise<Blob | null>((resolve) => {
                face.toBlob((blob) => {
                    resolve(blob);
                });
            });
            blobsPromises.push(blobPromise);
        }

        const blobs = await Promise.all(blobsPromises);

        const filteredBlobs = blobs.filter((blob) => blob !== null) as Blob[];

        console.log(filteredBlobs.length, ' Faces detected');
        return filteredBlobs;

    } catch(error){
        console.log("Error extracting face: ", error);
        throw error;
    }
};

export {
    loadModals,
    loadLabeledImages,
    cropImage,
};