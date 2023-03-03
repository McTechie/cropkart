import React, { useState } from 'react'
type FleetInfo = {
    licensenumber: number;
    vehiclenumber: string;
    drivername: string;
    phoneno: number;
  };
  
  const FleetForm = () => {
    const [formState, setFormState] = useState<FleetInfo>({
      licensenumber: 0,
      vehiclenumber: '',
      drivername: '',
      phoneno: 0,
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
          <label className="block text-gray-700 font-bold mb-2" htmlFor="licensenumber">
            Driver Licence Number
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
            id="licensenumber"
            name="licensenumber"
            type="number"
            placeholder="Enter driver licence number"
            value={formState.licensenumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="vehiclenumber">
            Vehicle Number
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="vehiclenumber"
            name="vehiclenumber"
            type="text"
            placeholder="Enter vehicle number"
            value={formState.vehiclenumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="drivername">
            Driver Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="drivername"
            name="drivername"
            type="text"
            placeholder="Enter driver name"
            value={formState.drivername}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phoneno">
            Phone Number
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phoneno"
            name="phoneno"
            type="number"
            placeholder="Enter phone number"
            value={formState.phoneno}
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
  
  export default FleetForm;