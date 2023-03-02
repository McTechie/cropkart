import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type LayoutProps = {
    children: React.ReactNode;
  };
  
  type SidebarNavItem = {
    label: string;
    href: string;
  };

  export default function Layout({ children }: LayoutProps) {
   
  
    return (
      <>
         <div className="flex bg-green-600 ">
        <Sidebar />
        <main className="w-full" >
          <Navbar />
          {children}
        </main>
      </div>
      </>
    );
  }