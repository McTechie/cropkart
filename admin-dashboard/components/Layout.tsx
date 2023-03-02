import Sidebar from "./Sidebar";

type LayoutProps = {
    children: React.ReactNode;
  };
  
  type SidebarNavItem = {
    label: string;
    href: string;
  };

  export default function Layout({ children }: LayoutProps) {
    const sidebarNavItems: SidebarNavItem[] = [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Users", href: "/users" },
      { label: "Settings", href: "/settings" },
    ];
  
    return (
      <>
        <div className="flex bg-green-600 ">
          <Sidebar  />
          <main >
            {children}
          </main>
        </div>
      </>
    );
  }