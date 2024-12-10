import React from "react";
import { ClickIcon } from "../icons/Click";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h4 className="text-3xl font-bold">Explore the Seasons</h4>
          <p className="text-gray-400 mt-2">
            Embrace the beauty of each season with us.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center bg-blue-500 p-6 rounded-lg shadow-lg">
            <h5 className="text-2xl font-semibold">Winter</h5>
            <p className="text-gray-200 mt-2">
              Cozy up by the fire with hot cocoa and snow-covered views.
            </p>
          </div>

          <div className="text-center bg-green-500 p-6 rounded-lg shadow-lg">
            <h5 className="text-2xl font-semibold">Spring</h5>
            <p className="text-gray-200 mt-2">
              Fresh blooms and rejuvenating moments in nature's beauty.
            </p>
          </div>

          <div className="text-center bg-yellow-500 p-6 rounded-lg shadow-lg">
            <h5 className="text-2xl font-semibold">Summer</h5>
            <p className="text-gray-200 mt-2">
              Fun in the sun, beach days, and endless adventure.
            </p>
          </div>

          <div className="text-center bg-orange-500 p-6 rounded-lg shadow-lg">
            <h5 className="text-2xl font-semibold">Autumn</h5>
            <p className="text-gray-200 mt-2">
              Crisp air, falling leaves, and pumpkin spice vibes.
            </p>
          </div>
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
