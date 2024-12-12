"use client";
import { useEffect, useState } from "react";

const TravelCards = () => {
  const [tourData, setTourData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/tours");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      const realData = responseData?.data || [];

      setTourData(realData);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load tours. Please try again later.");
      setTourData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(fetchData);

  if (isLoading)
    return (
      <div className="flex gap-12 justify-center">
        {tourData.length === 0 ? (
          <div className="text-gray-500 text-center p-4">
            No tours available at the moment.
          </div>
        ) : (
          tourData.map((tour) => (
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
                        ? `$${tour.price[0]}`
                        : "Price not available"}
                    </span>
                    <p className="text-sm text-gray-500">
                      {tour.startDate
                        ? `Starts: ${new Date(
                            tour.startDate
                          ).toLocaleDateString()}`
                        : "Dates not specified"}
                    </p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
};
export default TravelCards;
