import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebase } from "../providers/firebase";

const { storage } = firebase;

//Functions for downloading images
const getImage = async(ref : string) => {
//unsure on if implementation is needed
};

//Functions for Uploading
const uploadImage = async(image : File, name : string) => {
    try {
        const storageRef = ref(storage, `${name}/${image.name}`);
        await uploadBytes(storageRef, image);
        return await getDownloadURL(storageRef);
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
      }
};

export {
    getImage,
    uploadImage,
}