import { useState } from "react";
import "./imageProcessing.css";
import { loadLabeledImages } from "../../services/faceid";
import * as faceapi from 'face-api.js';
 

const ImageProcessing: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [profileStatus, setProfileStatus] = useState<string>('No profiles loaded');
    const [faceDescriptors, setFaceDescriptors] = useState<Array<faceapi.LabeledFaceDescriptors> | null>(null);
    const [processStatus, setProcessStatus] = useState<boolean>(false); 


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if(files) setSelectedFiles(files);
    };

    const loadProfiles = async() => {
        try{
            setProfileStatus('Profiles loading');
            setFaceDescriptors(await loadLabeledImages());
            setProfileStatus('Profiles Loaded');
        } catch(error){
            console.log('Error loading profiles: ', error);
            throw error;
        }
    };
    
    const processFiles = async() => {
        try{
            if(!selectedFiles) throw new Error('No files selected'); 
            if(profileStatus !== 'Profiles Loaded') throw new Error(profileStatus);
            if(processStatus) throw new Error('Currently processing files');
            setProcessStatus(true);

            const files = selectedFiles; //This will allow a user to select files for next upload without affect the current process
            const faceMatcher = new faceapi.FaceMatcher(faceDescriptors, 0.6)//Change this number to modify the certainty rating 

            for(const file of files){
                const results = await faceapi
                .detectAllFaces(await faceapi.bufferToImage(file))
                .withFaceLandmarks()
                .withFaceDescriptors();
                for(const result of results){
                    const bestMatch = faceMatcher.findBestMatch(result.descriptor);
                    console.log(bestMatch.toString());
                }
            }
            setProcessStatus(false);
        } catch(error){
            setProcessStatus(false);
            console.log('Failed to process images: ', error);
            throw error;
        }
    };

    return (
        <div>
            <div>
                <h2>Select Files</h2>
                <input type="file" onChange={handleFileChange} multiple />
                <button onClick={processFiles}>Process</button>
                <p>*Should work for file types JPEG, PNG, GIF, BMP, WebP, SVG</p>
                <p>**Other types will need additional testing i.e heic</p>
                <p>***This button does nothing currently</p>
            </div>
            <div>
                <h2>Select Profiles</h2>
                <button onClick={loadProfiles}>Load Profiles</button>
                <p>{profileStatus}</p>
                <p>*This will eventually be a selector so you can select who you want to id</p>
            </div>
            <div>
                <h2>Selected Files:</h2>
                {selectedFiles ? (
                <div> {[...selectedFiles].map((file, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`selected-image-${index}`}
                        className="selected-image"
                    />
                ))}
                </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
};

export default ImageProcessing;