import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { getFirestoreData } from "../../getFirestroreData";


interface FleetInfo {
    licensenumber: number;
    vehiclenumber: string;
    drivername: string;
    phoneno: number;
    
  }
  
  const fleetInfo: FleetInfo[] = [
    { licensenumber: 1, vehiclenumber: 'Ship 1', drivername: 'Container Ship', phoneno: 10000},
    { licensenumber: 2, vehiclenumber: 'Ship 2', drivername: 'Container Ship', phoneno: 10000},
    { licensenumber: 3, vehiclenumber: 'Ship 3', drivername: 'Container Ship', phoneno: 10000},
    { licensenumber: 4, vehiclenumber: 'Ship 4', drivername: 'Container Ship', phoneno: 10000},
    { licensenumber: 5, vehiclenumber: 'Ship 5', drivername: 'Container Ship', phoneno: 10000},
    { licensenumber: 6, vehiclenumber: 'Ship 6', drivername: 'Container Ship', phoneno: 10000},

  ];

  interface FleetTableProps {
    fleetData: FleetInfo[];
  }
  
  const FleetTable: React.FC<FleetTableProps>  = ({ fleetData }) => {
    const [selectedRow, setSelectedRow] = useState<FleetInfo | null>(null);
    const [isTfootOpen, setIsTfootOpen] = useState(false);
    console.log(fleetData);

    const handleRowClick = (fleet: FleetInfo) => {
      if (fleet === selectedRow) {
        setSelectedRow(null);
        setIsTfootOpen(false);
      } else {
        setSelectedRow(fleet);
        setIsTfootOpen(true);
      }
    };

    return (
        <>
        <div className="mx-10">
        <div className="flex justify-between">
        <h1 className="text-white text-2xl font-semibold mb-10">Fleet Information</h1>
        
          <button className="bg-slate-50 hover:bg-slate-200 p-2 text-sm rounded-sm font-medium my-5 flex items-center"><BsPlus className="mr-3 font-bold"/> Create Fleet</button>
        
        </div>
        <table className="bg-slate-50 rounded-md min-w-full ">
            <thead>
            <tr>
                <th className="border-b px-4 py-2">Driver Licence Number</th>
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
        </table>
        </div>
      </>
    );
   
  };

  export async function getServerSideProps() {
    const fleetData = await getFirestoreData('fleet');
  
    return {
      props: {
        fleetData,
      },
    };
  }
  
  export default FleetTable;

