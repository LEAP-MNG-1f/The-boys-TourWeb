"use client";
import React, { useState, useEffect } from "react";

const ViewAllPicture = () => {
  const [tourData, setTourData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const responseData = await response.json();
      const realData = responseData?.data || [];
      setTourData(realData);
      setError(null);
    } catch (error) {
      console.error("Detailed fetch error:", error);
      setError(`Failed to load categories: ${error.message}`);
      setTourData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (tourData.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % tourData.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [tourData]);

  const renderLoadingOrError = (content) => (
    <div className="container mx-auto relative overflow-hidden rounded-2xl shadow-lg h-[60] md:h-[75vh]flex justify-center items-center">
      {content}
    </div>
  );

  if (isLoading) {
    return renderLoadingOrError(
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500"></div>
    );
  }

  if (error) {
    return renderLoadingOrError(
      <div className="text-red-500 text-center">
        <p>{error}</p>
        <button
          onClick={fetchData}
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (tourData.length === 0) {
    return renderLoadingOrError(
      <div className="text-gray-500 text-center">
        <p>No categories found</p>
        <button
          onClick={fetchData}
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Refresh
        </button>
      </div>
    );
  }

  const currentImage = tourData[currentImageIndex];

  return (
    <div
      className="w-full relative overflow-hidden shadow-lg md:h-[75vh] h-[60vh]"
      style={{
        backgroundImage: `url(${currentImage.imageCategory})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-4 sm:px-8 md:px-16 lg:px-24 text-white">
        <div className="max-w-full sm:max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
            {currentImage.name || "Category"}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mb-4 line-clamp-3">
            {currentImage.description || ""}
          </p>

          {/* Navigation Dots */}
          <div className="flex space-x-2 mt-4">
            {tourData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllPicture;
