import { firestore } from 'firebase/app';


export const getFirestoreData = async function(collection) {
    const data = [];
  
    try {
      const querySnapshot = await firestore.collection(collection).get();
      querySnapshot.forEach((doc) => {
        const item = doc.data();
        data.push({ id: doc.id, ...item });
      });
    } catch (error) {
      console.error(`Error getting Firestore data from collection ${collection}: `, error);
    }
  
    return data;
  };