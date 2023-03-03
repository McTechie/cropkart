import React, { useState } from 'react'
type FleetInfo = {
    startlocn: string;
    starttime: string;
    endloc: string;
    endtime: string;
  };

//    id: 1, startlocn: 'Ship 1', starttime: 'Container Ship', endlocn: 'Surat', endtime : 'Surat'
  
  const TripForm = () => {
    const [formState, setFormState] = useState<FleetInfo>({
      startlocn: '',
      starttime: '',
      endloc: '',
      endtime: '',
    });
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormState({ ...formState, [name]: value });
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // handle form submission
    };
  
    return (
      <form onSubmit={handleSubmit} className="p-5 ">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="startlocn">
            Start Location
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
            id="startlocn"
            name="startlocn"
            type="number"
            placeholder="Enter Start Loaction"
            value={formState.startlocn}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="starttime">
            Start Time
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="starttime"
            name="starttime"
            type="text"
            placeholder="Enter Start Time"
            value={formState.starttime}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="drivername">
            End Location
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endloc"
            name="endloc"
            type="text"
            placeholder="Enter End Locatiob"
            value={formState.endloc}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="drivername">
            End Time
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endtime"
            name="endtime"
            type="text"
            placeholder="Enter End Time"
            value={formState.endtime}
            onChange={handleChange}
          />
        </div>
       
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semimbold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  };
  
  export default TripForm;