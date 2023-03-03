import { app ,database} from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from '../firebase';
import { useAuth } from '../Auth';
const dbInstance = collection(database, 'fleet');
const fleet=({drivername,licensenumber,vehiclenumber});
const fleetoperation = () => {
    const [, setFriends] = useState([])
    const { currentUser } = useAuth();
   
    async function fetchFleet() {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "!=", currentUser?.email));
    const querySnapshot = await getDocs(q);
    setFriends(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }
    fetchFriends()
     ,[]);
}

    
    
    
    
    
    
    
