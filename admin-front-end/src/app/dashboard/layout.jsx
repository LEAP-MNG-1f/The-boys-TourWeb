import React from "react";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import Navbar from "../ui/dashboard/navbar/navbar";

const Layout = ({ children }) => {
  return (
    <div className="w-full flex justify-center text-white h-[100vh] bg-[#151c2c] ">
      <div className="flex">
        <div className="w-[20vw] bg-[#182237] ">
          <Sidebar />
        </div>
        <div className="w-[80vw] p-5 pl-9">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

// bg - #151c2c
// bgsoft - #182237
