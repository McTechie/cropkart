import { app ,database} from '../../firebaseConfig';
import { useState, useEffect } from 'react';
import { BsPlus } from "react-icons/bs";
import FleetForm from "../../components/FleetForm";
import { collection, getDocs, query, setDoc, doc, addDoc, where, deleteDoc} from "@firebase/firestore";
import { useRouter } from 'next/router';
import UpdateFleetForm from '../../components/UpdateFleetForm';

interface FleetInfo {
    licensenumber: number;
    vehiclenumber: string;
    drivername: string;
    phoneno: number;
    fleetInfo: any[];
  }
  
  // const fleetInfo: FleetInfo[] = [
  //   { licensenumber: 1, vehiclenumber: 'Ship 1', drivername: 'Container Ship', phoneno: 10000},
  //   { licensenumber: 1, vehiclenumber: 'Ship 1', drivername: 'Container Ship', phoneno: 10000},
  //   { licensenumber: 1, vehiclenumber: 'Ship 1', drivername: 'Container Ship', phoneno: 10000},
  //   { licensenumber: 1, vehiclenumber: 'Ship 1', drivername: 'Container Ship', phoneno: 10000},
  //   { licensenumber: 1, vehiclenumber: 'Ship 1', drivername: 'Container Ship', phoneno: 10000},
  //   { licensenumber: 1, vehiclenumber: 'Ship 1', drivername: 'Container Ship', phoneno: 10000},

  // ];

  interface FleetTableProps {
    fleetData: FleetInfo[];
  }
  
  const FleetTable: React.FC<FleetTableProps>  = ({ fleetData }) => {
    const [selectedRow, setSelectedRow] = useState<FleetInfo | null>(null);
    const [isTfootOpen, setIsTfootOpen] = useState(false);
    const [ createFleet, setCreateFleet ] = useState(false);
    const [ updateFleet, setUpdateFleet ] = useState(false)
    const router = useRouter()

    const [fleetInfo, setFleetInfo] = useState<any[]>([]);
      const fleetDataFetch=async()=>{
        const q = query(collection(database, "fleet"));

        const querySnapshot = await getDocs(q);
        var docs: any[]=[];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          docs=[...docs,doc.data()]
        })
        setFleetInfo(docs);
        console.log(fleetInfo)
      }
      useEffect(() => {
          fleetDataFetch();
        },[]);

    const handleRowClick = (fleet: FleetInfo) => {
      
      if (fleet === selectedRow) {
        setSelectedRow(null);
        setIsTfootOpen(false);
      } else {
        setSelectedRow(fleet);
        setIsTfootOpen(true);
      }
    };

    const handleUpdateClick = (e: React.MouseEvent<HTMLButtonElement>, fleet: FleetInfo) => {
      e.stopPropagation();
      setUpdateFleet(true)
      console.log(fleet)
    }

    
    const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>, fleet: FleetInfo) => {
      e.stopPropagation();
      console.log(fleet.licensenumber)
      const q = query(collection(database, "fleet"), where("licensenumber", "==", fleet.licensenumber));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => deleteDoc(doc(database, "fleet", document.id )));
      // router.reload();
      
    }

    return (
        <>
        <div className="mx-10">
        <div className="flex justify-between">
        <h1 className="text-white text-2xl font-semibold mb-10">Fleet Information</h1>
          <button 
          onClick={() => setCreateFleet(true)}
          className="bg-slate-50 hover:bg-slate-200 p-2 text-sm rounded-sm font-medium my-5 flex items-center"><BsPlus className="mr-3 font-bold "/> Create Fleet</button>
        </div>
        {createFleet && (<div className="bg-slate-50 rounded-md min-h-full"><FleetForm /></div>)}
        {updateFleet && (<div className="bg-slate-50 rounded-md min-h-full">
        {/* <UpdateFleetForm fleetInfo={fleetInfo}/> */}
        </div>
        )
        }
        {!createFleet && !updateFleet && <table className="bg-slate-50 rounded-md min-w-full ">
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
                <tr key={fleet.licensenumber} onClick={() => handleRowClick(fleet)} className="hover:bg-gray-200 cursor-pointer">
                <td className="px-4 py-2 text-center">{fleet.licensenumber}</td>
                <td className="px-4 py-2 text-center">{fleet.vehiclenumber}</td>
                <td className="px-4 py-2 text-center">{fleet.drivername}</td>
                <td className="px-4 py-2 text-center">{fleet.phoneno}</td>
                <td className="px-4 py-2 text-center">
                
                <button onClick={(e) => handleUpdateClick(e, fleet)} className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">Update</button>
                </td>
                <td className="px-4 py-2 text-center">
                <button onClick={(e) => handleDeleteClick(e, fleet)} className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">Delete</button>
                </td>
    
                </tr>
            ))}

            </tbody>
            {selectedRow && (
        <tfoot
        className={`transition-all duration-500 ease-in-out ${
          isTfootOpen ? "h-auto" : "h-0"
        }`}
      >
        
          <tr>
            <td >
              <div className="bg-gray-100 p-4">
                <p>
                  <strong>Driver Licence Number:</strong>{" "}
                  {selectedRow.licensenumber}
                </p>
                <p>
                  <strong>Vehicle Number:</strong> {selectedRow.vehiclenumber}
                </p>
                <p>
                  <strong>Driver Name:</strong> {selectedRow.drivername}
                </p>
                <p>
                  <strong>Phone Number:</strong> {selectedRow.phoneno}
                </p>
              </div>
            </td>
          </tr>
        </tfoot>
      )}
        </table>}
        </div>
      </>
    );
   
  };

export default FleetTable;

