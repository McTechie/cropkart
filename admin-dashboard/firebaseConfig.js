import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);