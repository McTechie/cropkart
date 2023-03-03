<<<<<<< HEAD
import { database} from '../../firebaseConfig';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, Timestamp } from "@firebase/firestore";

=======
import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import TripForm from "../../components/TripForm";
>>>>>>> a633f68145e4ed5252e0273a31908bebe34b05a2

interface TrackInfo {
    startlocn: string;
    starttime: Timestamp;
    endlocn: string;
    endtime: Timestamp;
   
  }
  
  const TrackTable: React.FC<TrackInfo> = () => {
<<<<<<< HEAD
    function timestamptotime(timestamp:Timestamp) {
      const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
      const dateString = date.toLocaleString('en-IN');

      return dateString;
    }

    const [trackInfo, settrackInfo] = useState<any[]>([]);
      const trackData=async()=>{
        const q = query(collection(database, "trips"));

        const querySnapshot = await getDocs(q);
        var docs: any[]=[];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          docs=[...docs,doc.data()]
        })
        settrackInfo(docs);
      }
      useEffect(() => {
          trackData();
        },[]);
=======
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

>>>>>>> a633f68145e4ed5252e0273a31908bebe34b05a2
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
                <th className="border-b px-4 py-2">Start Location</th>
                <th className="border-b px-4 py-2">Start Time</th>
                <th className="border-b px-4 py-2">End Location</th>
                <th className="border-b px-4 py-2">End Time</th>
            </tr>
            
            </thead>
            <tbody>
<<<<<<< HEAD
            {trackInfo.map((track) => (
                <tr  className="hover:bg-gray-200">
                <td className="px-4 py-2">{track.startlocn}</td>
                <td className="px-4 py-2">{timestamptotime(track.starttime)}</td>
                <td className="px-4 py-2">{track.endlocn}</td>
                <td className="px-4 py-2">{timestamptotime(track.endtime)}</td>
               
=======
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
>>>>>>> a633f68145e4ed5252e0273a31908bebe34b05a2
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