"use client";
import { useEffect, useState } from "react";

export const Card = () => {
  const [tourData, setTourData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      console.log("Attempting to fetch from: http://localhost:8000/api/tours");

      const response = await fetch("http://localhost:8000/api/tours", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response text:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("Full response data:", responseData);

      const realData = responseData?.data || [];
      setTourData(realData);
      setIsLoading(false);
    } catch (error) {
      console.error("Detailed fetch error:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      setError(`Failed to load tours: ${error.message}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

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
          />
          <div className="absolute bottom-0 top-[130px] left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white z-20">
            <h3 className="font-semibold text-lg">
              {tour.title || "Untitled Tour"}
            </h3>
            <div className="flex items-center justify-between mt-2">
              <div>
                <span className="font-semibold text-lg">
                  {tour.price && tour.price.length > 0
                    ? `${tour.price[0].perPerson} (per person)`
                    : "Price not available"}
                </span>
                <p className="text-sm text-gray-500">
                  {tour.startDate || "Start date not available"}
                </p>
              </div>
              <button className="border border-white text-white rounded-lg py-1 px-4 hover:bg-white hover:text-black transition-all duration-300">
                Book now
              </button>
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4 z-10 pointer-events-none">
            <p className="text-gray-300 text-sm text-center">
              {tour.additionalInfo || "Additional information not available"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
