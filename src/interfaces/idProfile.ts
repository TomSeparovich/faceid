import { DocumentData } from "firebase/firestore";

class Profile {
    fName       : string;
    lName       : string;
    imageRefs   : string[];

    constructor(fName: string, lName: string, imageRefs: string[]) {
        this.fName = fName;
        this.lName = lName;
        this.imageRefs = imageRefs;
      }
}

const profileConverter = {
    toFirestore: (profile : Profile) => {
        return {
            fName : profile.fName,
            lName : profile.lName,
            imageRefs : profile.imageRefs,
        };
    },
    fromFirestore: (data : DocumentData) => {
        return new Profile(data.fName, data.lName, data.imageRefs);
    }
};

export default Profile;

export {
    profileConverter,
}

