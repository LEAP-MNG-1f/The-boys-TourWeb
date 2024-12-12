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

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      const responseData = await response.json();
      console.log("Full response data:", responseData);

      const realData = responseData?.data || [];
      setTourData(realData);
      console.log("category", realData);
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

  useEffect(() => {
    if (tourData.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % tourData.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [tourData]);

  if (isLoading || tourData.length === 0) {
    return (
      <div className="container mx-auto relative overflow-hidden rounded-[15px] shadow-lg h-[65vh] mt-[100px] flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto relative overflow-hidden rounded-[15px] shadow-lg h-[65vh] mt-[100px] flex justify-center items-center text-red-500">
        {error}
      </div>
    );
  }

  const currentImage = tourData[currentImageIndex];

  return (
    <div
      className="container mx-auto relative overflow-hidden rounded-[15px] shadow-lg h-[65vh] mt-[100px]"
      style={{
        backgroundImage: `url(${currentImage.imageCategory})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 text-white">
        <div className="pt-[50px]">
          <h1 className="text-5xl font-bold mb-4">
            {currentImage.name || "Category"}
          </h1>
          <p className="text-xl max-w-2xl">{currentImage.description || ""}</p>

          <div className="flex space-x-2 mt-4">
            {tourData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full ${
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
