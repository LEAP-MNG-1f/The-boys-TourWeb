"use client";
import { useState } from "react";

export const AdminPage = () => {
  const [selectedSeason, setSelectedSeason] = useState(null);
  return (
    <div>
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
    </div>
  );
};
