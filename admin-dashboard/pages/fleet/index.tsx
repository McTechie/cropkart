import { app ,database} from '../../firebaseConfig';
import { useState, useEffect } from 'react';
import { collection, getDocs, query } from "@firebase/firestore";

const dbInstance = collection(database, 'fleet');

interface FleetInfo {
    licensenumber: number;
    vehiclenumber: string;
    drivername: string;
    phoneno: number;
    
  }
  
  // const fleetInfo: FleetInfo[] = [
  //   { licensenumber: 1, vehiclenumber: 'Ship 1', drivername: 'Container Ship', phoneno: 10000},
  //   { licensenumber: 1, vehiclenumber: 'Ship 1', drivername: 'Container Ship', phoneno: 10000},
  //   { licensenumber: 1, vehiclenumber: 'Ship 1', drivername: 'Container Ship', phoneno: 10000},
  //   { licensenumber: 1, vehiclenumber: 'Ship 1', drivername: 'Container Ship', phoneno: 10000},
  //   { licensenumber: 1, vehiclenumber: 'Ship 1', drivername: 'Container Ship', phoneno: 10000},
  //   { licensenumber: 1, vehiclenumber: 'Ship 1', drivername: 'Container Ship', phoneno: 10000},

  // ];
  
  const FleetTable: React.FC<FleetInfo> = () => {
      const [fleetInfo, setFleetInfo] = useState<any[]>([]);
      const fleetData=async()=>{
        const q = query(collection(database, "fleet"));

        const querySnapshot = await getDocs(q);
        var docs: any[]=[];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          docs=[...docs,doc.data()]
        })
        setFleetInfo(docs);
      }
      useEffect(() => {
          fleetData();
        },[]);
    return (
        <>
        <div className="mx-10">
        <h1 className="text-white text-2xl font-semibold mb-10">Fleet Information</h1>
        <table className="bg-slate-50 rounded-md min-w-full ">
            <thead>
            <tr>
                <th className="border-b px-2 py-2">Driver Licence Number</th>
                <th className="border-b px-4 py-2">Vehicle Number</th>
                <th className="border-b px-4 py-2">Driver Name</th>
                <th className="border-b px-4 py-2">Phone Number</th>
                
            </tr>
            </thead>
            <tbody>
            {fleetInfo.map((fleet) => (
                <tr key={fleet.licensenumber} className="hover:bg-gray-200">
                <td className="px-4 py-2">{fleet.licensenumber}</td>
                <td className="px-4 py-2">{fleet.vehiclenumber}</td>
                <td className="px-4 py-2">{fleet.drivername}</td>
                <td className="px-4 py-2">{fleet.phoneno}</td>
               
                </tr>
            ))}

            </tbody>
        </table>
        </div>
      </>
    );
   
  };
  
  export default FleetTable;