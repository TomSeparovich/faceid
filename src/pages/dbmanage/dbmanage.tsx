import './dbmanage.css';

import { useEffect, useState } from "react";
import { addImageRef, createNewProfile, getProfileData } from "../../services/fb_firestore";
import Profile from '../../interfaces/profile';
import { uploadImage } from '../../services/fb_storage';
import { imag } from '@tensorflow/tfjs-node';


const DbManage: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [profileList, setProfileList] = useState<Profile[] | null>(null);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [imageIndex, setImageIndex] = useState<number>(0);

    //Pretty sure these can get removed with minimal effort
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
        setImageIndex(0);
        setSelectedProfile(profile);
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

    const increaseIndex = () => {
        if(selectedProfile == null) return;
        setImageIndex(imageIndex + 1);
        if(imageIndex == selectedProfile.imageRefs.length - 1){
            setImageIndex(0);
        }
    };
    
    const decreaseIndex = () => {
        if(selectedProfile == null) return;
        if(selectedProfile.imageRefs.length == 0) return;
        setImageIndex(imageIndex - 1);
        if(imageIndex == 0){
            setImageIndex(selectedProfile.imageRefs.length - 1);
        }
    };

    return (
        <div className="body">
            <div className="leftColumn">
                <h2>Profiles</h2>
                {profileList?.map((result, index) => (
                    <tr key={index}>
                        <td>
                            <button onClick={() => handleSelectProfile(result)}>
                                {result.fName} {result.lName}
                            </button>
                        </td>
                    </tr>
                ))}
                <h2></h2>
                <button> Create New Profile </button>
                <div className="createProfile">
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
            </div>
            <div className="rightColumn"> 
            {selectedProfile ? (
                <div>
                    <h2>Profile: {selectedProfile.fName} {selectedProfile.lName} </h2>
                    {selectedProfile?.imageRefs?.length > 0 ? (
                        <div className="storedImages">
                            <h3>Stored Images</h3>
                            <div className="imageControl">
                                <button onClick={decreaseIndex}>{'<'}</button>
                                <p>{imageIndex + 1}</p>
                                <button onClick={increaseIndex}>{'>'}</button>
                            </div>
                            <button>
                                <img src={selectedProfile?.imageRefs?.at(imageIndex)}/>
                            </button>
                        </div>
                    ) : (
                        <div>
                            No stored images
                        </div>
                    )}
                    
                    <h4>Delete Image</h4>
                    <div className="imageUpload">
                        <h3>Upload Images</h3>
                        <input type="file" onChange={handleFileChange} multiple />
                        <button onClick={() => uploadImages()}>
                            Upload
                        </button>
                    </div>
                    <button> Delete: {selectedProfile.fName} {selectedProfile.lName} </button>
                </div>
            ) : (
                <div>No Profile Selected</div>
            )}
            </div>
        </div>
    )
};

export default DbManage;