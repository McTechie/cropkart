interface FleetInfo {
    id: number;
    name: string;
    type: string;
    capacity: number;
    region: string;
    cost: number;
    status: string;
  }
  
  const fleetInfo: FleetInfo[] = [
    { id: 1, name: 'Ship 1', type: 'Container Ship', capacity: 10000, region : 'Surat', cost : 100000, status : 'Active' },
    { id: 1, name: 'Ship 1', type: 'Container Ship', capacity: 10000, region : 'Surat', cost : 100000, status : 'Active' },
    { id: 1, name: 'Ship 1', type: 'Container Ship', capacity: 10000, region : 'Surat', cost : 100000, status : 'Active'},
    { id: 1, name: 'Ship 1', type: 'Container Ship', capacity: 10000, region : 'Surat', cost : 100000, status : 'Active'},
    { id: 1, name: 'Ship 1', type: 'Container Ship', capacity: 10000, region : 'Surat', cost : 100000, status : 'Active'},
    { id: 1, name: 'Ship 1', type: 'Container Ship', capacity: 10000, region : 'Surat', cost : 100000, status : 'Active'},

  ];
  
  const FleetTable: React.FC<FleetInfo> = () => {
    return (
        <>
        <div className="mx-10">
        <h1 className="text-white text-2xl font-semibold mb-10">Fleet Information</h1>
        <table className="bg-slate-50 rounded-md min-w-full ">
            <thead>
            <tr>
                <th className="border-b px-4 py-2">ID</th>
                <th className="border-b px-4 py-2">Name</th>
                <th className="border-b px-4 py-2">Type</th>
                <th className="border-b px-4 py-2">Capacity</th>
                <th className="border-b px-4 py-2">Region</th>
                <th className="border-b px-4 py-2">Cost</th>
                <th className="border-b px-4 py-2">Status</th>
            </tr>
            </thead>
            <tbody>
            {fleetInfo.map((fleet) => (
                <tr key={fleet.id} className="hover:bg-gray-200">
                <td className="px-4 py-2">{fleet.id}</td>
                <td className="px-4 py-2">{fleet.name}</td>
                <td className="px-4 py-2">{fleet.type}</td>
                <td className="px-4 py-2">{fleet.capacity}</td>
                <td className="px-4 py-2">{fleet.region}</td>
                <td className="px-4 py-2">{fleet.cost}</td>
                <td className="px-4 py-2">{fleet.status}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
      </>
    );
   
  };
  
  export default FleetTable;