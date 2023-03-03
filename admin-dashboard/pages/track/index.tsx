import { database} from '../../firebaseConfig';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, Timestamp } from "@firebase/firestore";


interface TrackInfo {
    startlocn: string;
    starttime: Timestamp;
    endlocn: string;
    endtime: Timestamp;
   
  }
  
  const TrackTable: React.FC<TrackInfo> = () => {
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
    return (
        <>
        <div className="mx-10">
        <h1 className="text-white text-2xl font-semibold mb-10" >Track Information</h1>
        <table className="bg-slate-50 rounded-md min-w-full ">
            <thead>
            <tr>
                <th className="border-b px-4 py-2">Start Location</th>
                <th className="border-b px-4 py-2">Start Time</th>
                <th className="border-b px-4 py-2">End Location</th>
                <th className="border-b px-4 py-2">End Time</th>
            </tr>
            </thead>
            <tbody>
            {trackInfo.map((track) => (
                <tr  className="hover:bg-gray-200">
                <td className="px-4 py-2">{track.startlocn}</td>
                <td className="px-4 py-2">{timestamptotime(track.starttime)}</td>
                <td className="px-4 py-2">{track.endlocn}</td>
                <td className="px-4 py-2">{timestamptotime(track.endtime)}</td>
               
                </tr>
            ))}
            </tbody>
        </table>
        </div>
      </>
    );
   
  };
  
  export default TrackTable;