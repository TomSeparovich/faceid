import { arrayRemove, arrayUnion, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { firebase } from "../providers/firebase";

const { db } = firebase;

//Functions for downloading
const getIDs = async() => {
    const idsRef = collection(db, 'faceid');
    const docs = await getDocs(idsRef);

    docs.forEach((doc) => {
        const data = doc.data()
        console.log(data);
    })
};

//Function for uploading
const createNewID = async(fName : string, lName : string) => {
    try{
        const idRef = doc(db, 'faceid', `${fName}${lName}`);
        await setDoc(idRef, {
            fName: fName,
            lName: lName,
        }, { merge: true });
    } catch(error){
        console.log('Create ID failed: ', error);
        throw error;
    }
};

const addImageRef = async(id : string, ref : string) => {
    try{
        const idRef = doc(db, 'faceid', id);
        await updateDoc(idRef, {
            imageRefs: arrayUnion(ref)
        });
    } catch(error){
        console.log('Add image reference failed: ', error);
        throw error;
    }
};

const deleteImageRef = async(id : string, ref : string) => {
    try{
        const idRef = doc(db, 'faceid', id);
        await updateDoc(idRef, {
            imageRefs: arrayRemove(ref)
        });
    } catch(error){
        console.log('Add image reference failed: ', error);
        throw error;
    }
};

export {
    getIDs,

    createNewID,
    addImageRef,
    deleteImageRef,
}