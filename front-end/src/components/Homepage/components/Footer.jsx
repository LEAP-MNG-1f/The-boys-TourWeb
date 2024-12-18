import React from "react";
import Link from "next/link";
import MyIcon from "../icons/Insdagram";
import Youtube from "../icons/Youtube";
import Watsupp from "../icons/Watsapp";
import Facebook from "../icons/Feacebook";

const Footer = () => {
  return (
    <footer className="bg-[#F6F6F7] text-black py-[90px] mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h4 className="text-3xl font-bold">Explore the Seasons</h4>
          <p className="text-[#696A75] mt-2">
            Embrace the beauty of each season with us.
          </p>
        </div>

        <div className="flex flex-col justify-between md:flex-row md:justify-between mb-8">
          <div className="flex flex-col  md:w-1/3 md:mr-10 mb-8 md:mb-0">
            <h1 className="text-[22px] font-bold">About</h1>
            <p className="mt-5 w-full md:w-[300px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center md:w-1/3 md:mr-10 mb-8 md:mb-0">
            <h1 className="text-[22px] font-bold">Quick Links</h1>
            <Link href="/">
              <h1 className="text-black hover:text-gray-500 mt-5 relative group">
                Home
                <span className="block absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </h1>
            </Link>
            <Link href="/specialtour">
              <h1 className="text-black hover:text-gray-500 mt-5 relative group">
                Create Your Tour
                <span className="block absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </h1>
            </Link>
            <Link href="/event-page">
              <h1 className="text-black hover:text-gray-500 mt-5 relative group">
                Mongolian Event
                <span className="block absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </h1>
            </Link>
            <Link href="/about-us">
              <h1 className="text-black hover:text-gray-500 mt-5 relative group">
                About Us
                <span className="block absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </h1>
            </Link>
          </div>

          <div className="flex flex-col md:w-1/3">
            <h1 className="text-[22px] font-bold">Connect With Us</h1>
            <div className="flex gap-5 items-center mt-5">
              <Link href={`/`} legacyBehavior>
                <Facebook />
              </Link>
              <Link href={`/`} legacyBehavior>
                <MyIcon />
              </Link>
              <Link href={`/`} legacyBehavior>
                <Youtube />
              </Link>
              <Link href={`/`} legacyBehavior>
                <Watsupp />
              </Link>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <h1>Email: Ydamtour@gmail.com</h1>
              <h1>Phone: 80640490</h1>
              <h1>Phone: 60602106</h1>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 mb-6"></div>

        <div className="text-center">
          <p className="text-gray-400 text-sm ">
            &copy; {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
