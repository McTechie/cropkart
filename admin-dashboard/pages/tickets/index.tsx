import { database} from '../../firebaseConfig';
import { useState, useEffect } from 'react';
import { collection, getDocs, query } from "@firebase/firestore";

const dbInstance = collection(database, 'ticket');
interface TicketInfo {
    type: string;
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

  // ];
  
  const TicketTable: React.FC <TicketInfo> = () => {
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
    return (
        <>
        <div className="mx-10">
        <h1 className="text-white text-2xl font-semibold mb-10" >Ticket Information</h1>
        <table className="bg-slate-50 rounded-md min-w-full ">
            <thead>
            <tr>
                <th className="border-b px-4 py-2">User Type</th>
                <th className="border-b px-4 py-2">Message</th>
                <th className="border-b px-4 py-2">Status</th>
                
            </tr>
            </thead>
            <tbody>
            {TicketInfo.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-200">
                <td className="px-4 py-2">{ticket.type}</td>
                <td className="px-4 py-2">{ticket.message}</td>
                <td className="px-4 py-2">{ticket.resolved?"Resolved":"Pending"}</td>
               
                </tr>
            ))}
            </tbody>
        </table>
        </div>
      </>
    );
   
  };
  
  export default TicketTable;