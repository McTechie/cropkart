import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: `${process.env.NEXT_APP_API_KEY}`,
  authDomain: `${process.env.NEXT_APP_AUTH_DOMAIN}`,
  databaseURL: `${process.env.NEXT_APP_DATABASE_URL}`,
  projectId: `${process.env.NEXT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.NEXT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.NEXT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.NEXT_APP_DATABASE_APP_ID}`,
  measurementId: `${process.env.NEXT_APP_MEASUREMENT_ID}`,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);