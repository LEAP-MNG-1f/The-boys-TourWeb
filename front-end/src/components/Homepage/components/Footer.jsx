import React from "react";
import Link from "next/link";
import MyIcon from "../icons/Insdagram";
import Youtube from "../icons/Youtube";
import Watsupp from "../icons/Watsapp";
import Facebook from "../icons/Feacebook";

const Footer = () => {
  return (
    <footer className="bg-[#F6F6F7] text-black py-16 mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h4 className="text-4xl font-extrabold text-gray-800">
            Explore the Seasons
          </h4>
          <p className="text-[#696A75] mt-4 text-lg">
            Embrace the beauty of each season with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-4 flex flex-col items-start">
            <h2 className="text-2xl font-bold text-gray-900">About</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to [Your Company Name], where Mongolia&apos;s beauty and
              culture come alive! Explore the vast Gobi Desert, serene valleys,
              and nomadic traditions with our personalized tours. We create
              unforgettable journeys for solo travelers, families, and groups.
              Discover the essence of Mongolia and craft lasting memories with
              us!
            </p>
          </div>

          <div className="space-y-4 flex flex-col items-center justify-center md:items-center">
            <h2 className="text-2xl font-bold text-gray-900">Quick Links</h2>
            <nav className="space-y-3 flex flex-col">
              {[
                { href: "/", label: "Home" },
                { href: "/specialtour", label: "Create Your Tour" },
                { href: "/event-page", label: "Mongolian Event" },
                { href: "/about-us", label: "About Us" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-700 hover:text-orange-500 transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4 flex flex-col  items-center justify-center md:items-center">
            <h2 className="text-2xl font-bold text-gray-900 pl-[17px]">
              Connect With Us
            </h2>
            <div className="flex space-x-5 mb-6">
              {[
                { icon: <Facebook />, href: "/" },
                { icon: <MyIcon />, href: "/" },
                { icon: <Youtube />, href: "/" },
                { icon: <Watsupp />, href: "/" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-700 hover:text-orange-500 transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
            <div className="space-y-2 text-gray-600 pl-14">
              <p>Email: Ydamtour@gmail.com</p>
              <p>Phone: 80640490</p>
              <p>Phone: 60602106</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
