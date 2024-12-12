"use client";
import { Card } from "../card/Card";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [selectedSeason, setSelectedSeason] = useState(null);

  return (
    <div className="container mx-auto pt-20 pb-32 flex flex-col  shadow-xl rounded-[12px]">
      <div className="flex items-center text-center justify-center gap-[10px]">
        <h1 className="font-bold text-4xl text-black text-center">
          Choose Your
        </h1>
        <h1 className="font-bold text-4xl text-orange-500 text-center">Tour</h1>
      </div>

      <div className="flex gap-6 pt-6 justify-start pl-[90px]">
        {["Summer", "Autumn", "Winter", "Spring"].map((season) => (
          <button
            key={season}
            onClick={() => setSelectedSeason(season)}
            className={`border-2 text-gray-800 py-2 px-6 rounded-lg font-medium transition duration-300 ${
              selectedSeason === season
                ? "bg-orange-500 text-white border-orange-500"
                : "hover:bg-gray-100"
            }`}
          >
            {season}
          </button>
        ))}
      </div>
      <div className="pt-10 px-[90px]">
        <div className="">
          <Card />
        </div>
      </div>
    </div>
  );
};
