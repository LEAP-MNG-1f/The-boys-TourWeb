"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Card = ({ selectedCategory, tourData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTourId, setSelectedTourId] = useState(null);

  const handleBookNowClick = (tourId) => {
    setSelectedTourId(selectedTourId === tourId ? null : tourId);
  };

  if (error) {
    return (
      <div className="container mx-auto mt-10 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tourData.map((tour) => (
        <div
          key={tour._id}
          className="w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative group"
        >
          <img
            className="w-full h-60 object-cover transform transition-transform duration-500 group-hover:scale-110"
            src={
              tour.images && tour.images.length > 0
                ? tour.images[0]
                : "https://via.placeholder.com/400x250?text=Tour+Image"
            }
            alt={tour.title || "Tour Image"}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white z-20">
            <h3 className="font-semibold text-lg">
              {tour.title || "Untitled Tour"}
            </h3>
            <div className="flex items-center justify-between mt-2">
              <div>
                <span className="font-semibold text-lg">
                  {tour.price && tour.price.length > 0
                    ? `$${tour.price[0].perPerson} (per person)`
                    : "Price not available"}
                </span>
                <p className="text-sm text-gray-500">
                  {tour.startDate || "Start date not available"}
                </p>
              </div>
              <Link
                href={`/view-all/${tour?.title}`}
                onClick={() => handleBookNowClick(tour._id)}
                className="border p-2 max-w-[89px] w-full border-white text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                Book now
              </Link>
            </div>
          </div>
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-4 z-10 pointer-events-none ${
              selectedTourId === tour._id
                ? "translate-y-0"
                : "-translate-y-full"
            }`}
          >
            <div className="w-full h-full flex text-center pt-[30px]">
              <p className="text-gray-300 text-sm ">
                {tour.description
                  ? tour.description.length > 150
                    ? `${tour.description.substring(0, 150)}...`
                    : tour.description
                  : "Additional information not available"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
