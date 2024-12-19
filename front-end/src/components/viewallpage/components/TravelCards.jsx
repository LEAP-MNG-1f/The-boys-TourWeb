"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const TravelCards = () => {
  const [tourData, setTourData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/tours", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response text:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const responseData = await response.json();
      const realData = responseData || [];
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
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
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
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
        {tourData.map((tour) => (
          <div
            key={tour._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
              <h2 className="text-xl font-bold mb-2 truncate">{tour.title}</h2>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {tour.description || "No description available"}
              </p>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <div>
                  <span className="font-semibold text-lg block">
                    {tour.price && tour.price.length > 0
                      ? `${tour.price[0].perPerson} (per person)`
                      : "Price not available"}
                  </span>
                  <p className="text-sm text-gray-500">{tour.startDate}</p>
                </div>
                <Link
                  href={`/view-all/${tour?.title}`}
                  className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-all duration-300 text-center"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelCards;
