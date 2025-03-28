import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="LAYOUT relative flex flex-col justify-between min-h-screen">
      <div className="xl:container mx-auto flex w-full">
        <Sidebar />

        <div className="overflow-hidden w-full">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
