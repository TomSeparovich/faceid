import { useState } from "react";
import "./imageProcessing.css";

const ImageProcessing: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if(files) setSelectedFiles(files);
    };

    //Should add preventitive measure to stop button being pressed again
    const processFiles = async() => {
        const files = selectedFiles; //This will allow a user to select files for next upload without affect the current
        if(!files) return; //Ensure there are selected files

        //Call face loading

        for(const file of files){

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