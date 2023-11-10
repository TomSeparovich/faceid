import './dbmanage.css';

import { useEffect, useState } from "react";
import { createNewID, getIdData, getIds } from "../../services/fb_firestore";
import Profile from '../../interfaces/idProfile';


const DbManage: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [profileList, setProfileList] = useState<Profile[] | null>(null);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');

    //This is called when the page is loaded
    useEffect(() => {
        getProfiles(); 
    }, []); 

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if(files) setSelectedFiles(files);
    };

    const handleSelectProfile = (profile : any) => {
        setSelectedProfile(profile);
    }

    const uploadImages = async() => {

    }

    const getProfiles = async () => {
        try {
          const data = await getIdData();
          setProfileList(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    const createNewProfile = () => {
        try{
            if(fName == null) throw new Error('First Name is null');
            if(lName == null) throw new Error('Last Name is null');
            createNewID(fName, lName).then(() => {
                getProfiles();
            })
        } catch(error){
            console.log('Failed to create new profile: ', error);
            throw error;
        }
    }



    return (
        <div className="body">
            <div>
                <div>
                    <h2>Stored Profiles</h2>
                    {profileList?.map((result, index) => (
                        <tr key={index}>
                            <td>
                                <button onClick={() => handleSelectProfile(result)}>
                                    {result.fName} {result.lName}
                                </button>
                            </td>
                        </tr>
                    ))}
                </div>
                <div>
                    <h2>Stored Images</h2>
                    <p>{selectedProfile?.fName} {selectedProfile?.lName}</p>
                </div>
            </div>
            <div>
                <div>
                    <h2>Create new profile</h2>
                    <div className="search-bar">
                        <label>First Name: </label>
                        <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} />
                    </div>
                    <div className="search-bar">
                        <label>Last Name: </label>
                        <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} />
                    </div>
                    <button onClick={() => createNewProfile()}>
                        Create profile
                    </button>
                </div>
                <div>
                    <h2>Upload Images</h2>
                    <input type="file" onChange={handleFileChange} multiple />
                    <button onClick={() => uploadImages()}>
                        Upload
                    </button>
                </div>
                
            </div>
        </div>
    )
};

export default DbManage;