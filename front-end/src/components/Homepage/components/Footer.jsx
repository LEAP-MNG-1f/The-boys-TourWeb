import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-[90px] mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h4 className="text-3xl font-bold">Explore the Seasons</h4>
          <p className="text-gray-400 mt-2">
            Embrace the beauty of each season with us.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-between mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <Link href={"/"}>
              <h1 className="text-gray-400 hover:text-white">Home</h1>
            </Link>
            <Link href={"about-us"}>
              <h1 className="text-gray-400 hover:text-white">About</h1>
            </Link>
            <Link href={"/"}>
              <h1 className="text-gray-400 hover:text-white">Services</h1>
            </Link>
            <Link href={"/"}>
              <h1 className="text-gray-400 hover:text-white">Contact</h1>
            </Link>
          </div>
        </div>

        <div className="flex justify-center gap-6 mb-6"></div>

        <div className="text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
