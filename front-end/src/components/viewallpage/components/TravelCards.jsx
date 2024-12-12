"use client";
import { useEffect, useState } from "react";

const TravelCards = () => {
  const [tourData, setTourData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);

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
      setError(null);
    } catch (error) {
      console.error("Detailed fetch error:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });

      setError(`Failed to load tours: ${error.message}`);
      setTourData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>Error: {error}</p>
        <button
          onClick={fetchData}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (tourData.length === 0) {
    return (
      <div className="text-gray-500 text-center p-4">
        <p>No tours available at the moment.</p>
        <button
          onClick={fetchData}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-12 justify-center">
      {tourData.map((tour) => (
        <div
          key={tour._id}
          className="w-80 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={
              tour.images && tour.images.length > 0
                ? tour.images[0]
                : "https://via.placeholder.com/400x250?text=Tour+Image"
            }
            alt={tour.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{tour.title}</h2>
            <p className="text-gray-700 mb-4 line-clamp-3">
              {tour.description || "No description available"}
            </p>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold text-lg">
                  {tour.price && tour.price.length > 0
                    ? `${tour.price[0].perPerson} (per person)`
                    : "Price not available"}
                </span>
                <p className="text-sm text-gray-500">{tour.startDate}</p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelCards;
