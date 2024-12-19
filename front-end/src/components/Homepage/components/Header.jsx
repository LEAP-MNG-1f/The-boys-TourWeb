"use client";
import Link from "next/link";
import { useState } from "react";

export const HeaderPart = ({ home, customTour, event, aboutUs }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed w-full top-0 z-50 backdrop-blur-sm bg-black/40">
      <header className="py-4 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/">
            <div className="text-white text-2xl font-bold tracking-wide">
              LOGO
            </div>
          </Link>

          <nav className="hidden md:flex gap-8">
            <Link href="/" passHref>
              <h1
                className={`text-lg font-medium transition duration-300 ${
                  home ? "text-orange-500" : "text-white hover:text-orange-500"
                }`}
              >
                Mongolian Tour
              </h1>
            </Link>
            <Link href="/special-order" passHref>
              <h1
                className={`text-lg font-medium transition duration-300 ${
                  customTour
                    ? "text-orange-500"
                    : "text-white hover:text-orange-500"
                }`}
              >
                Create Your Tour
              </h1>
            </Link>
            <Link href="/event-page" passHref>
              <h1
                className={`text-lg font-medium transition duration-300 ${
                  event ? "text-orange-500" : "text-white hover:text-orange-500"
                }`}
              >
                Mongolian Event
              </h1>
            </Link>
            <Link href="/about-us" passHref>
              <h1
                className={`text-lg font-medium transition duration-300 ${
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
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "✖" : "☰"}
            </button>

            <nav
              className={`absolute top-0 left-0 w-full bg-white text-black justify-end items-center flex flex-col gap-8 p-4 transition-transform duration-500 ${
                isMenuOpen ? "translate-y-0" : "-translate-y-full"
              }`}
            >
              <button
                className="text-black text-2xl focus:outline-none absolute top-4 right-4"
                aria-label="Close Menu"
                onClick={() => setIsMenuOpen(false)}
              >
                ✖
              </button>

              <Link href="/" passHref>
                <h1
                  className={`text-lg font-medium transition duration-300 ${
                    home
                      ? "text-orange-500"
                      : "text-black hover:text-orange-500"
                  }`}
                >
                  Mongolian Tour
                </h1>
              </Link>
              <Link href="/special-order" passHref>
                <h1
                  className={`text-lg font-medium transition duration-300 ${
                    customTour
                      ? "text-orange-500"
                      : "text-black hover:text-orange-500"
                  }`}
                >
                  Create Your Tour
                </h1>
              </Link>
              <Link href="/event-page" passHref>
                <h1
                  className={`text-lg font-medium transition duration-300 ${
                    event
                      ? "text-orange-500"
                      : "text-black hover:text-orange-500"
                  }`}
                >
                  Mongolian Event
                </h1>
              </Link>
              <Link href="/about-us" passHref>
                <h1
                  className={`text-lg font-medium transition duration-300 ${
                    aboutUs
                      ? "text-orange-500"
                      : "text-black hover:text-orange-500"
                  }`}
                >
                  About Us
                </h1>
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};
