import './dbmanage.css';

import { useEffect, useState } from "react";
import { addImageRef, createNewProfile, getProfileData } from "../../services/fb_firestore";
import Profile from '../../interfaces/profile';
import { uploadImage } from '../../services/fb_storage';


const DbManage: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [profileList, setProfileList] = useState<Profile[] | null>(null);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
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
        setSelectedImage(null);
    };

    const handleSelectImage = (image : any) => {
        setSelectedImage(image);
    };

    const getProfiles = async () => {
        try {
          setProfileList(await getProfileData());
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const createProfile = async() => {
        try{
            if(fName == null) throw new Error('First Name is null');
            if(lName == null) throw new Error('Last Name is null');
            await createNewProfile(fName, lName);
            getProfiles();
        } catch(error){
            console.log('Failed to create new profile: ', error);
            throw error;
        }
    }

    const uploadImages = async() => {
        try{
            if(selectedProfile == null) throw new Error('No selected profile');
            if(selectedFiles == null) throw new Error('No selected files');

            for(const file of selectedFiles){
                const profile = `${selectedProfile.fName}${selectedProfile.lName}`;
                const ref = await uploadImage(file, profile);
                await addImageRef(ref, profile);
            }
            getProfiles();

            setSelectedProfile(profileList?.find(
                (profile) => profile.fName === selectedProfile.fName && profile.lName === selectedProfile.lName)
                ?? null);
        } catch(error){
            console.log('Failed to upload image: ', error);
            throw error;
        }
    };

    return (
        <div className="body">
            <div className="leftColumn">
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
                    <button onClick={() => createProfile()}>
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
                <div>
                    <h2>Delete profile</h2>
                    {selectedProfile ? (
                        <button>
                        Delete: {selectedProfile.fName} {selectedProfile.lName}
                        </button>
                    ) : (
                        <p>Please select a profile</p>
                    )}

                    <h2>Delete Image</h2>
                    {selectedImage ? (
                        <button>
                        Delete
                        </button>
                    ) : (
                        <p>Please select an image</p>
                    )}
                </div>
            </div>
            <div className="rightColumn">
                <div className="profiles">
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
                    {selectedProfile?.imageRefs?.map((file, index) => (
                        <button onClick={() => handleSelectImage(file)}>
                            <img src={file} alt={`Uploaded Image ${index}: ${file}`} key={index} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default DbManage;