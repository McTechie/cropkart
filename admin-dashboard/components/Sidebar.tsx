import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople, BsTruck } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import Link from "next/link";
import { useContext, useState } from "react";


interface MenuItem {
  title: string;
  icon: string;
  link: string;
  gap?: boolean;
}



const Menus : MenuItem[] = [
    { title: "Fleet", icon: "truck", link: '/fleet' },
    { title: "Track Trip", gap: false, icon: "people", link: '/track' },
    { title: "Tickets", gap: false, icon: "mail", link: '/tickets' },
  ];

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [selectedMenu, setSelectedMenu] = useState(0);
    const renderIcon = (iconName: string) => {
        switch (iconName) {
          case 'truck':
            return <BsTruck />;
          case 'people':
            return <BsPeople />;
          case 'mail':
            return <FiMail />;
          default:
            return null;
        }
      };
     

     return (
        <div className="flex  bg-white z-50 ">
          <div
            className={` ${
              open ? "w-72" : "w-20 "
            } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
          >
            
            <div className="flex gap-x-4 items-center">
             
              <h1
                className={`text-black origin-left font-bold text-2xl duration-200 ${
                  !open && "scale-0"
                }`}
              >
                CropKart
              </h1>
            </div>
            <ul className="pt-6 ">
              {Menus.map((Menu, index) => (
                
                <Link href={`${Menu.link}`}><li
                  key={index}
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} 
                  ${
                    index === selectedMenu ? " bg-emerald-600 text-white" : "text-black"
                  } `
                }
                  onClick={() => setSelectedMenu(index)}
                >
                  <span className="text-gray-500 text-xl">{Menu.icon && renderIcon(Menu.icon)}</span>
                  <span className={`${!open && "hidden"} ${ index === selectedMenu && " text-white"} text-black text-md origin-left duration-200`}>
                    {Menu.title}
                  </span>
                </li>
                </Link>
              ))}
            </ul>
          </div>
          
        </div>
      );
  
};

export default Sidebar;