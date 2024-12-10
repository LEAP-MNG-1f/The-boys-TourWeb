import React from "react";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import Navbar from "../ui/dashboard/navbar/navbar";

const Layout = ({ children }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[1440px] flex">
        <div className="w-[20vw] ">
          <Sidebar />
        </div>
        <div className="w-[80vw] ">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
