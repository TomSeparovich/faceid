import './dbmanage.css';

import { useEffect, useState } from "react";
import { getIdData, getIds } from "../../services/fb_firestore";
import Profile from '../../interfaces/idProfile';


const DbManage: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [profileList, setProfileList] = useState<Profile[] | null>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if(files) setSelectedFiles(files);
    };

    //const handleUpload 

    useEffect(() => {
        const getProfiles = async () => {
          try {
            const data = await getIdData();
            setProfileList(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        getProfiles(); 
      }, []); //Will add in update when new profile is created soon



    return (
        <div className="body">
            <div>
                <h2>Stored Profiles</h2>
                {profileList?.map((result, index) => (
                    <tr key={index}>
                        <td>
                            <button>
                                {result.fName} {result.lName}
                            </button>
                        </td>
                    </tr>
                ))}
            </div>
            <div>
                <div>
                    <h2>Select Files</h2>
                    <input type="file" onChange={handleFileChange} multiple />
                    <button type="submit">Upload</button>
                </div>
                <div>
                    <h2>Stored Images</h2>
                </div>
            </div>
        </div>
    )
};

export default DbManage;