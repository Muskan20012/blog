// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpuNiIErQjyjVDl7ZGc4dHcpa2IY-gZxU",
    authDomain: "blogproject-a4b6b.firebaseapp.com",
    projectId: "blogproject-a4b6b",
    storageBucket: "blogproject-a4b6b.appspot.com",
    messagingSenderId: "210231117850",
    appId: "1:210231117850:web:5547f3b12139d9decbe9a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider=new GoogleAuthProvider();
export const auth=getAuth(app);
export const db = getFirestore(app);