// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDoI3N7QoR85mIMJ0N7jbuizawMRhbrhwA",
    authDomain: "react-firebase-33594.firebaseapp.com",
    projectId: "react-firebase-33594",
    storageBucket: "react-firebase-33594.appspot.com",
    messagingSenderId: "58594833198",
    appId: "1:58594833198:web:f0be29be9f7c356f35c0bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);