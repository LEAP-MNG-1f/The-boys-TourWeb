"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Carousel = () => {
  const [tourData, setTourData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // New state for image index

  const thumbnailImages = [
    "https://cdn.mongolia-guide.com/generated/aimag/yB5tmMud3F7rJsh124LfK4ML8rLIdCKXHqTaw3tX_1920_1000.jpeg",
    "https://www.stepperiders.mn/public/storage/scJB23uf9SGsD1kzSparTueVnLzkzgRlOM2pyJVM.jpg",
    "https://cdn.bookatrekking.com/data/images/2019/08/gobi-desert-new.webp",
    "https://www.toursmongolia.com/uploads/landscape%20mongolian%20gobi%20nature%20destination.jpg",
  ];

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

  // UseEffect to fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // SetInterval to change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % tourData.length); // Loops back to the first image after the last one
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [tourData.length]); // Dependency on tourData length to avoid unnecessary re-renders

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

  const currentImage = tourData[currentImageIndex]; // Get the current image based on index

  return (
    <div className="relative overflow-hidden shadow-lg h-[75vh]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            currentImage.images && currentImage.images[0]
          })`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="container mx-auto relative z-10 h-full">
          <div className="flex h-full items-center text-white justify-between">
            <div className="flex w-[50%] md:w-1/2 flex-col">
              <div className="flex flex-col gap-[15px] pb-[165px]">
                <h1 className="text-[30px] md:text-5xl font-bold">
                  {currentImage.title || "Category"}
                </h1>
              </div>
              <div className="absolute top-[580px] flex items-end">
                <div className="flex gap-[20px] flex-col">
                  <Link href="/view-all-page">
                    <button
                      className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg shadow-lg text-white text-lg"
                      aria-label="Jump to all tours"
                    >
                      Jump to all tours
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[250px] md:right-0">
            <div className="grid grid-cols-2 gap-4">
              {thumbnailImages.map((image, index) => (
                <Link
                  key={index}
                  href="/view-all-page"
                  className="w-32 h-32 md:w-40 md:h-40"
                >
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={image}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
