import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import 'firebase/compat/firestore'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBKI3LJU9bCy-46cVxSeufCeDOOjmw70bE",
    authDomain: "cropkart-prod.firebaseapp.com",
    databaseURL: "https://cropkart-prod-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cropkart-prod",
    storageBucket: "cropkart-prod.appspot.com",
    messagingSenderId: "1043499973940",
    appId: "1:1043499973940:web:b001ed15ff4b790885f961",
    measurementId: "G-0BJC072D8Q"
};

export const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app)
