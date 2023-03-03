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
    return (
        <>
        <div className="mx-10">
        <h1 className="text-white text-2xl font-semibold mb-10" >Track Information</h1>
        <table className="bg-slate-50 rounded-md min-w-full ">
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
            {trackInfo.map((track) => (
                <tr key={track.id} className="hover:bg-gray-200">
                <td className="px-4 py-2 text-center">{track.id}</td>
                <td className="px-4 py-2 text-center">{track.startlocn}</td>
                <td className="px-4 py-2 text-center">{track.starttime}</td>
                <td className="px-4 py-2 text-center">{track.endlocn}</td>
                <td className="px-4 py-2 text-center">{track.endtime}</td>
               
                </tr>
            ))}
            </tbody>
        </table>
        </div>
      </>
    );
   
  };
  
  export default TrackTable;