import { useState } from "react";
import "./imageProcessing.css";

const ImageProcessing: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if(files) setSelectedFiles(files);
      };

    return (
        <div>
            <div>
                <h2>Select Files</h2>
                <input type="file" onChange={handleFileChange} multiple />
                <button type="submit">Process</button>
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