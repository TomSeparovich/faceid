import { useState } from "react";
import "./imageProcessing.css";
import { loadLabeledImages } from "../../services/faceid";
import * as faceapi from 'face-api.js';
 

const ImageProcessing: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [profileStatus, setProfileStatus] = useState<string>('No profiles loaded');
    const [faceDescriptors, setFaceDescriptors] = useState<Array<faceapi.LabeledFaceDescriptors> | null>(null); 


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if(files) setSelectedFiles(files);
    };

    const loadProfiles = async() => {
        setFaceDescriptors(await loadLabeledImages());
        setProfileStatus('Profiles Loaded');
    };

    //Should add preventitive measure to stop button being pressed again
    const processFiles = async() => {
        if(!selectedFiles) return; //Ensure there are selected files
        const files = selectedFiles; //This will allow a user to select files for next upload without affect the current process
        const faceMatcher = new faceapi.FaceMatcher(faceDescriptors, 0.6)

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