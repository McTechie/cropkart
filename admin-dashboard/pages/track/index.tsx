import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import TripForm from "../../components/TripForm";

interface TrackInfo {
    id: number;
    startlocn: string;
    starttime: string;
    endlocn: string;
    endtime: string;
   
  }
  
  const trackInfo: TrackInfo[] = [
    { id: 1, startlocn: 'Ship 1', starttime: 'Container Ship', endlocn: 'Surat', endtime : 'Surat' },
    { id: 1, startlocn: 'Ship 1', starttime: 'Container Ship', endlocn: 'Surat', endtime : 'Surat' },
    { id: 1, startlocn: 'Ship 1', starttime: 'Container Ship', endlocn: 'Surat', endtime : 'Surat'},
    { id: 1, startlocn: 'Ship 1', starttime: 'Container Ship', endlocn: 'Surat', endtime : 'Surat'},
    { id: 1, startlocn: 'Ship 1', starttime: 'Container Ship', endlocn: 'Surat', endtime : 'Surat'},
    { id: 1, startlocn: 'Ship 1', starttime: 'Container Ship', endlocn: 'Surat', endtime : 'Surat'},

  ];
  
  const TrackTable: React.FC<TrackInfo> = () => {
    const [selectedRow, setSelectedRow] = useState<TrackInfo | null>(null);
    const [isTfootOpen, setIsTfootOpen] = useState(false);
    const [ createTrip, setCreateTrip ] = useState(false);
    // console.log(trackData);

    const handleRowClick = (trip : TrackInfo) => {
      if (trip === selectedRow) {
        setSelectedRow(null);
        setIsTfootOpen(false);
      } else {
        setSelectedRow(trip);
        setIsTfootOpen(true);
      }
    };

    const handleUpdateClick = (e: React.MouseEvent<HTMLButtonElement>, trip : TrackInfo) => {
      e.stopPropagation();
      // console.log(fleet)
    }

    
    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>, trip : TrackInfo) => {
      e.stopPropagation();

    }

    return (
        <>
        <div className="mx-10">
        <div className="flex justify-between">
        <h1 className="text-white text-2xl font-semibold mb-10">Track Information</h1>
          <button 
          onClick={() => setCreateTrip(true)}
          className="bg-slate-50 hover:bg-slate-200 p-2 text-sm rounded-sm font-medium my-5 flex items-center"><BsPlus className="mr-3 font-bold "/> Create Trip</button>
        </div>
        {createTrip && (<div className="bg-slate-50 rounded-md min-h-full"><TripForm /></div>)}
            {!createTrip && <table className="bg-slate-50 rounded-md min-w-full ">
            <thead>
            <tr>
                <th className="border-b px-4 py-2">ID</th>
                <th className="border-b px-4 py-2">Start Location</th>
                <th className="border-b px-4 py-2">Start Time</th>
                <th className="border-b px-4 py-2">End Location</th>
                <th className="border-b px-4 py-2">End Time</th>
            </tr>
            
            </thead>
            <tbody>
            {trackInfo.map((trip) => (
                <tr key={trip.id} className="hover:bg-gray-200">
                <td className="px-4 py-2 text-center">{trip.id}</td>
                <td className="px-4 py-2 text-center">{trip.startlocn}</td>
                <td className="px-4 py-2 text-center">{trip.starttime}</td>
                <td className="px-4 py-2 text-center">{trip.endlocn}</td>
                <td className="px-4 py-2 text-center">{trip.endtime}</td>
                <td className="px-4 py-2 text-center">
                
                <button onClick={(e) => handleUpdateClick(e, trip)} className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">Update</button>
                </td>
                <td className="px-4 py-2 text-center">
                <button onClick={(e) => handleDeleteClick(e, trip)} className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">Delete</button>
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
                          {selectedRow.startlocn}
                        </p>
                        <p>
                          <strong>Vehicle Number:</strong> {selectedRow.starttime}
                        </p>
                        <p>
                          <strong>Driver Name:</strong> {selectedRow.endlocn}
                        </p>
                        <p>
                          <strong>Phone Number:</strong> {selectedRow.endtime}
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
  
  export default TrackTable;