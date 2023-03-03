interface TicketInfo {
    id: number;
    type: string;
    message: string; 
  }
  
  const TicketInfo: TicketInfo[] = [
    { id: 1, type: 'Ship 1', message: 'Container Ship'},
    { id: 1, type: 'Ship 1', message: 'Container Ship'},
    { id: 1, type: 'Ship 1', message: 'Container Ship'},
    { id: 1, type: 'Ship 1', message: 'Container Ship'},
    { id: 1, type: 'Ship 1', message: 'Container Ship'},
    { id: 1, type: 'Ship 1', message: 'Container Ship'},

  ];
  
  const TicketTable: React.FC <TicketInfo> = () => {
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
                
            </tr>
            </thead>
            <tbody>
            {TicketInfo.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-200">
                <td className="px-4 py-2 text-center">{ticket.id}</td>
                <td className="px-4 py-2 text-center">{ticket.type}</td>
                <td className="px-4 py-2 text-center">{ticket.message}</td>
               
                </tr>
            ))}
            </tbody>
        </table>
        </div>
      </>
    );
   
  };
  
  export default TicketTable;