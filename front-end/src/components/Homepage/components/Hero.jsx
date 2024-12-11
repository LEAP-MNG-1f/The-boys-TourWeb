"use client";
import { Card } from "../card/Card";
import { useState } from "react";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card
            image="https://www.stepperiders.mn/public/storage/scJB23uf9SGsD1kzSparTueVnLzkzgRlOM2pyJVM.jpg"
            description="Beautiful Scenery"
            price={100}
            additionalInfo="Experience the stunning beauty of Mongolia's landscapes, perfect for photography and relaxation."
          />
          <Card
            image="https://www.discovermongolia.mn/uploads/Gall-Central-shireet-lake.jpg"
            description="Stunning Lake"
            price={120}
            additionalInfo="Visit one of Mongolia's pristine lakes, surrounded by breathtaking natural beauty."
          />
          <Card
            image="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/t/n/tnc_46175181_Full.jpg?crop=0%2C233%2C4000%2C2200&wid=4000&hei=2200&scl=1.0"
            description="Mountain Adventure"
            price={150}
            additionalInfo="Explore the majestic mountains of Mongolia, ideal for hiking and adventure seekers."
          />
          <Card
            image="https://news.mn/en/wp-content/uploads/sites/3/2022/05/Orkhon-waterfall-Orkhon-valley-Mongolia.jpg"
            description="Waterfall Escape"
            price={130}
            additionalInfo="Discover the tranquility of Mongolia's waterfalls, a perfect getaway for nature lovers."
          />
        </div>
      </div>
    </div>
  );
};
