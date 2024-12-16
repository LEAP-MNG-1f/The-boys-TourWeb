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

        <div className="flex flex-col   md:justify-between mb-8">
          <div className=" flex items-center  justify-between ">
            <div>
              <h1 className="text-[22px] font-bold">About </h1>
              <p className="mt-5 w-[300px] ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
            </div>
            <div className="w-[100px] ">
              <Link href={"/"}>
                <h1 className="text-black hover:text-gray-500">Home</h1>
              </Link>
              <Link href={"about-us"}>
                <h1 className="text-black hover:text-gray-500 mt-5">About</h1>
              </Link>
              <Link href={"/"}>
                <h1 className="text-black hover:text-gray-500 mt-5">
                  Services
                </h1>
              </Link>
              <Link href={"/"}>
                <h1 className="text-black hover:text-gray-500 mt-5">Contact</h1>
              </Link>
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex gap-5 items-center">
                <Link href={`/`}>
                  <Facebook />
                </Link>
                <Link href={`/`}>
                  <MyIcon />
                </Link>
                <Link href={`/`}>
                  <Youtube />
                </Link>
                <Link href={`/`}>
                  <Watsupp />
                </Link>
              </div>
              <div className="flex gap-5 flex-col">
                <h1>Email : Ydamtour@gmail.com </h1>
                <h1> Phone : 80640490</h1>
                <h1>Phone : 60602106</h1>
              </div>
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
