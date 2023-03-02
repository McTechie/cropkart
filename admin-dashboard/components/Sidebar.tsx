import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { useContext, useState } from "react";

const Menus = [
    { title: "Dashboard"},
    { title: "Inbox",  },
    { title: "Accounts", gap: true },
    { title: "Schedule "},
    { title: "Search" },
   
  ];

const Sidebar = () => {
    const [open, setOpen] = useState(true);

     return (
        <div className="flex  bg-white z-50 ">
          <div
            className={` ${
              open ? "w-72" : "w-20 "
            } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
          >
            
            <div className="flex gap-x-4 items-center">
              {/* <img
                src="./src/assets/logo.png"
                className={`cursor-pointer duration-500 ${
                  open && "rotate-[360deg]"
                }`}
              /> */}
              <h1
                className={`text-black origin-left font-medium text-xl duration-200 ${
                  !open && "scale-0"
                }`}
              >
                CropKart
              </h1>
            </div>
            <ul className="pt-6 ">
              {Menus.map((Menu, index) => (
                <li
                  key={index}
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${
                    index === 0 && "bg-light-white"
                  } `}
                >
                  {/* <img src={`./src/assets/${Menu.src}.png`} /> */}
                  <span className={`${!open && "hidden"} text-black origin-left duration-200`}>
                    {Menu.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      );
  
};

export default Sidebar;