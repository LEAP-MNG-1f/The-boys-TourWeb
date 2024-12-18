"use client";
import Link from "next/link";

export const HeaderPart = ({ home, customTour, event, aboutUs }) => {
  return (
    <div className="fixed w-full top-0 z-50 backdrop-blur-sm bg-black/40">
      <header className="py-4 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href={"/"}>
            <div className="text-white   text-2xl font-bold tracking-wide">
              LOGO
            </div>
          </Link>

          <nav className="hidden md:flex gap-8">
            <Link href={"/"} passHref>
              <h1
                className={`text-lg font-medium transition duration-300 ${
                  home ? "text-orange-500" : "text-white hover:text-orange-500"
                }`}
              >
                Mongolian Tour
              </h1>
            </Link>
            <Link href={"/special-order"} passHref>
              <h1
                className={` text-lg font-medium transition duration-300 ${
                  customTour
                    ? "text-orange-500"
                    : "text-white hover:text-orange-500"
                }`}
              >
                Create Your Tour
              </h1>
            </Link>
            <Link href={"/event-page"} passHref>
              <h1
                className={` text-lg font-medium transition duration-300 ${
                  event ? "text-orange-500" : "text-white hover:text-orange-500"
                }`}
              >
                Mongolian Event
              </h1>
            </Link>
            <Link href={"/about-us"} passHref>
              <h1
                className={` text-lg font-medium transition duration-300 ${
                  aboutUs
                    ? "text-orange-500"
                    : "text-white hover:text-orange-500"
                }`}
              >
                About Us
              </h1>
            </Link>
          </nav>

          <div className="md:hidden">
            <button
              className="text-white text-2xl focus:outline-none"
              aria-label="Open Menu"
            >
              ☰
            </button>
            <div></div>
          </div>
        </div>
      </header>
    </div>
  );
};
