// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxixCMbZLYTW0eR_yem5Qmml_bxmVFjhA",
    authDomain: "spaceapps-98383.firebaseapp.com",
    projectId: "spaceapps-98383",
    storageBucket: "spaceapps-98383.appspot.com",
    messagingSenderId: "1005777960839",
    appId: "1:1005777960839:web:962e96d75a6764d61f9d22",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);

export { app, auth, db, storage, serverTimestamp };
