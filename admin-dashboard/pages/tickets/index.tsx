<<<<<<< HEAD
import { database} from '../../firebaseConfig';
import { useState, useEffect } from 'react';
import { collection, getDocs, query } from "@firebase/firestore";

const dbInstance = collection(database, 'ticket');
=======
import { useState } from "react";

>>>>>>> a633f68145e4ed5252e0273a31908bebe34b05a2
interface TicketInfo {
    type: string;
<<<<<<< HEAD
    resolved: boolean; 
    message: string;
  }
  
  // const TicketInfo: TicketInfo[] = [
  //   { id: 1, type: 'Ship 1', message: 'Container Ship'},
  //   { id: 1, type: 'Ship 1', message: 'Container Ship'},
  //   { id: 1, type: 'Ship 1', message: 'Container Ship'},
  //   { id: 1, type: 'Ship 1', message: 'Container Ship'},
  //   { id: 1, type: 'Ship 1', message: 'Container Ship'},
  //   { id: 1, type: 'Ship 1', message: 'Container Ship'},
=======
    message: string;
    resolved: boolean;
  }
  
  const TicketInfo: TicketInfo[] = [
    { id: 1, type: 'Ship 1', message: 'Container Ship', resolved: false},
    { id: 1, type: 'Ship 1', message: 'Container Ship', resolved: true},
    { id: 1, type: 'Ship 1', message: 'Container Ship', resolved: false},
    { id: 1, type: 'Ship 1', message: 'Container Ship', resolved: false},
    { id: 1, type: 'Ship 1', message: 'Container Ship', resolved: false},
    { id: 1, type: 'Ship 1', message: 'Container Ship', resolved: true},
>>>>>>> a633f68145e4ed5252e0273a31908bebe34b05a2

  // ];
  
  const TicketTable: React.FC <TicketInfo> = () => {
<<<<<<< HEAD
    const[TicketInfo,setTicketInfo]=useState<any[]>([]); 
    const ticketData=async()=>{
      const q = query(collection(database, "ticket"));
      const querySnapshot = await getDocs(q);
      var docs: any[]=[];
      querySnapshot.forEach((doc)=>{
        docs=[...docs,doc.data()];
      });
      setTicketInfo(docs);
    }
    useEffect(() => {
      ticketData();
    },[]);
=======
    const [ticketInfo, setTicketInfo] = useState<TicketInfo[]>([
      { id: 1, type: 'Ship 2', message: 'Container Ship', resolved: false},
      { id: 2, type: 'Ship 4', message: 'Container Ship', resolved: true},
      { id: 3, type: 'Ship 5', message: 'Container Ship', resolved: false},
      { id: 4, type: 'Ship 5', message: 'Container Ship', resolved: false},
      { id: 5, type: 'Ship 4', message: 'Container Ship', resolved: false},
      { id: 6, type: 'Ship 7', message: 'Container Ship', resolved: true},
    ]);
  
    const [selectedValue, setSelectedValue] = useState<boolean | null>(null);
  
    const handleUpdateClick = (e: React.MouseEvent<HTMLButtonElement>, ticket: TicketInfo) => {
      setSelectedValue(ticket.resolved);
    };
  
  
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, ticket: TicketInfo) => {
      const updatedTicketInfo = ticketInfo.map(t =>
        t.id === ticket.id ? { ...t, resolved: e.target.value === 'true' } : t);
      setTicketInfo(updatedTicketInfo);
    };

>>>>>>> a633f68145e4ed5252e0273a31908bebe34b05a2
    return (
        <>
        <div className="mx-10">
        <h1 className="text-white text-2xl font-semibold mb-10" >Ticket Information</h1>
        <table className="bg-slate-50 rounded-md min-w-full ">
            <thead>
            <tr>
                <th className="border-b px-4 py-2">User Type</th>
                <th className="border-b px-4 py-2">Message</th>
<<<<<<< HEAD
                <th className="border-b px-4 py-2">Status</th>
=======
                <th className="border-b px-4 py-2">Resolved</th>
>>>>>>> a633f68145e4ed5252e0273a31908bebe34b05a2
                
            </tr>
            </thead>
            <tbody>
            {TicketInfo.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-200">
<<<<<<< HEAD
                <td className="px-4 py-2">{ticket.type}</td>
                <td className="px-4 py-2">{ticket.message}</td>
                <td className="px-4 py-2">{ticket.resolved?"Resolved":"Pending"}</td>
               
=======
                <td className="px-4 py-2 text-center">{ticket.id}</td>
                <td className="px-4 py-2 text-center">{ticket.type}</td>
                <td className="px-4 py-2 text-center">{ticket.message}</td>
                <td className="px-4 py-2 text-center">
                {selectedValue === ticket.resolved ? (
                  <select value={selectedValue} onChange={(e) => handleSelectChange(e, ticket)}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </select>
                ) : (
                  ticket.resolved.toString()
                )}
              </td>
                <td className="px-4 py-2 text-center">
                <button onClick={(e) => handleUpdateClick(e, ticket)} className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">Update</button>
                </td>
                <td className="px-4 py-2 text-center">
                <button o
                // nClick={(e) => handleDeleteClick(e, ticket)} 
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">Delete</button>
                </td>
>>>>>>> a633f68145e4ed5252e0273a31908bebe34b05a2
                </tr>
            ))}
            </tbody>
        </table>
        </div>
      </>
    );
   
  };
  
  export default TicketTable;