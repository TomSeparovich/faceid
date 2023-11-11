import { arrayRemove, arrayUnion, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { firebase } from "../providers/firebase";
import Profile, { profileConverter } from "../interfaces/profile";
const { db } = firebase;

//Functions for downloading
const getProfiles = async() => {
    const idsRef = collection(db, 'faceid');
    return await getDocs(idsRef);
};

const getProfileData = async() => {
    const docs = await getProfiles();
    const data: Profile[] = [];

    docs.forEach((doc) => {
        data.push(profileConverter.fromFirestore(doc.data()));
    });

    return data;
};

//Function for uploading
const createNewProfile = async(fName : string, lName : string) => {
    try{
        const profileRef = doc(db, 'faceid', `${fName}${lName}`);
        await setDoc(profileRef, {
            fName: fName,
            lName: lName,
        }, { merge: true });
    } catch(error){
        console.log('Create ID failed: ', error);
        throw error;
    }
};

const addImageRef = async(ref : string, profile : string) => {
    try{
        const profileRef = doc(db, 'faceid', profile);
        await updateDoc(profileRef, {
            imageRefs: arrayUnion(ref)
        });
    } catch(error){
        console.log('Add image reference failed: ', error);
        throw error;
    }
};

const deleteImageRef = async(profile : string, ref : string) => {
    try{
        const profileRef = doc(db, 'faceid', profile);
        await updateDoc(profileRef, {
            imageRefs: arrayRemove(ref)
        });
    } catch(error){
        console.log('Add image reference failed: ', error);
        throw error;
    }
};

export {
    getProfiles,
    getProfileData,

    createNewProfile,
    addImageRef,
    deleteImageRef,
}