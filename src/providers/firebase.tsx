import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from "firebase/storage";
import { PropsWithChildren, createContext, useContext } from 'react';

interface IFireBase {
    app: FirebaseApp;
    db: Firestore;
    storage: FirebaseStorage;
}

const firebaseConfig = {
    apiKey: "AIzaSyBhP1qISPwUcFaHGUclHn3He3EJlYBZ_yg",
    authDomain: "facialrecognitionts.firebaseapp.com",
    projectId: "facialrecognitionts",
    storageBucket: "facialrecognitionts.appspot.com",
    messagingSenderId: "182557817794",
    appId: "1:182557817794:web:d5e83c52ee67d4f546345b",
    measurementId: "G-CVJ1LBB2LW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export const firebase: IFireBase = {
    app,
    db,
    storage,
};

const FirebaseContext = createContext<IFireBase>(firebase);

const useFirebase = () => useContext(FirebaseContext);

const FireBaseProvider: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    )
}

export {
    FireBaseProvider,
    useFirebase,
}
