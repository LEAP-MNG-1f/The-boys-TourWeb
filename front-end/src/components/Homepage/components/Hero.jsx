"use client";
import { Card } from "../card/Card";
import { useState } from "react";

export const Hero = () => {
  const [selectedSeason, setSelectedSeason] = useState(null);

  const seasons = ["Summer", "Autumn", "Winter", "Spring"];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 sm:pb-32 flex flex-col shadow-xl rounded-xl sm:rounded-2xl">
      <div className="flex items-center justify-center space-x-2 mb-6">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-black">
          Choose Your
        </h1>
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-orange-500">
          Tour
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 px-4 sm:px-0">
        {seasons.map((season) => (
          <button
            key={season}
            onClick={() => setSelectedSeason(season)}
            className={`
              border-2 text-gray-800 py-2 px-4 sm:px-6 rounded-lg font-medium 
              transition duration-300 text-sm sm:text-base
              ${
                selectedSeason === season
                  ? "bg-orange-500 text-white border-orange-500"
                  : "hover:bg-gray-100"
              }
            `}
          >
            {season}
          </button>
        ))}
      </div>

      <div className="px-4 sm:px-8 lg:px-16">
        <Card selectedSeason={selectedSeason} />
      </div>
    </div>
  );
};

export default Hero;
