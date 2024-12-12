"use client";
import React from "react";
import { useState } from "react";

const GobiTourInfo = () => {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const name = "Sengee";
  const email = "senge@gmail.com";
  const tourTitle = "Gobi Tour";

  const tourImages = [
    "https://news.mn/en/wp-content/uploads/sites/3/2021/08/2.jpg",
  ];

  const tourPrices = [
    {
      pax: "2",
      perPerson: "1690",
      _id: "6759075d45c04475e156cdb9",
    },
    {
      pax: "3",
      perPerson: "1390",
      _id: "6759075d45c04475e156cdba",
    },
    {
      pax: "4",
      perPerson: "1355",
      _id: "6759075d45c04475e156cdbb",
    },
  ];

  return (
    <div className="pt-[50px] w-full ">
      <div className="flex gap-6 pt-6 justify-start pb-[30px] ">
        <button className="text-white border border-white p-[15px] rounded-lg">
          + Create new category
        </button>
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
      <div className="w-[25%] bg-[#182237] shadow-lg rounded-lg overflow-hidden p-6 ">
        <h2 className="text-2xl font-bold text-white mb-4">{tourTitle}</h2>

        <div className="grid grid-cols-1 gap-4 mb-6">
          {tourImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Tour Image ${index + 1}`}
              className="w-full h-40 object-cover rounded-md"
            />
          ))}
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold text-white w-20">Name:</span>
            <span className="text-white">{name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-white w-20">Email:</span>
            <span className="text-blue-600">{email}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white my-4">Pricing</h3>

        <table className="w-full mb-4">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 text-white">Group Size</th>
              <th className="text-right py-2 text-white">Price Per Person</th>
            </tr>
          </thead>
          <tbody>
            {tourPrices.map((price) => (
              <tr key={price._id} className="border-b last:border-b-0">
                <td className="py-2 text-white">{price.pax} people</td>
                <td className="py-2 text-right font-medium text-blue-600">
                  ${price.perPerson}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GobiTourInfo;
