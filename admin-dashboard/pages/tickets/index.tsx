import { useState } from "react";

interface TicketInfo {
    id: number;
    type: string;
    message: string;
    resolved: boolean;
  }
  
  // const TicketInfo: TicketInfo[] = [
  //   { id: 1, type: 'Ship 1', message: 'Container Ship', resolved: false},
  //   { id: 1, type: 'Ship 1', message: 'Container Ship', resolved: true},
  //   { id: 1, type: 'Ship 1', message: 'Container Ship', resolved: false},
  //   { id: 1, type: 'Ship 1', message: 'Container Ship', resolved: false},
  //   { id: 1, type: 'Ship 1', message: 'Container Ship', resolved: false},
  //   { id: 1, type: 'Ship 1', message: 'Container Ship', resolved: true},

  // ];
  
  const TicketTable: React.FC <TicketInfo> = () => {
    const [ticketInfo, setTicketInfo] = useState<TicketInfo[]>([
      { id: 1, type: 'Ship 2', message: 'Container Ship', resolved: false},
      { id: 2, type: 'Ship 4', message: 'Container Ship', resolved: true},
      { id: 3, type: 'Ship 5', message: 'Container Ship', resolved: false},
      { id: 4, type: 'Ship 5', message: 'Container Ship', resolved: false},
      { id: 5, type: 'Ship 4', message: 'Container Ship', resolved: false},
      { id: 6, type: 'Ship 7', message: 'Container Ship', resolved: true},
    ]);
  
    const [selectedValue, setSelectedValue] = useState<boolean>(false);
  
    const handleUpdateClick = (e: React.MouseEvent<HTMLButtonElement>, ticket: TicketInfo) => {
      setSelectedValue(ticket.resolved);
    };
  
  
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, id: number) => {
      let updated: TicketInfo = ticketInfo.find(t => t.id === id)!
      updated.resolved = !updated.resolved
      setTicketInfo(ticketInfo => [...ticketInfo, updated]);
    };

    return (
        <>
        <div className="mx-10">
        <h1 className="text-white text-2xl font-semibold mb-10" >Ticket Information</h1>
        <table className="bg-slate-50 rounded-md min-w-full ">
            <thead>
            <tr>
                <th className="border-b px-4 py-2">User ID</th>
                <th className="border-b px-4 py-2">User Type</th>
                <th className="border-b px-4 py-2">Message</th>
                <th className="border-b px-4 py-2">Resolved</th>
                
            </tr>
            </thead>
            <tbody>
            {ticketInfo.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-200">
                <td className="px-4 py-2 text-center">{ticket.id}</td>
                <td className="px-4 py-2 text-center">{ticket.type}</td>
                <td className="px-4 py-2 text-center">{ticket.message}</td>
                <td className="px-4 py-2 text-center">
                {selectedValue === ticket.resolved ? (
                  <select onChange={(e) => handleSelectChange(e, ticket.id)}>
                    <option value={'true'}>True</option>
                    <option value={'false'}>False</option>
                  </select>
                ) : (
                  ticket.resolved.toString()
                )}
              </td>
                <td className="px-4 py-2 text-center">
                <button onClick={(e) => handleUpdateClick(e, ticket)} className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">Update</button>
                </td>
                <td className="px-4 py-2 text-center">
                <button 
                // onClick={(e) => handleDeleteClick(e, ticket)} 
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
      </>
    );
   
  };
  
  export default TicketTable;