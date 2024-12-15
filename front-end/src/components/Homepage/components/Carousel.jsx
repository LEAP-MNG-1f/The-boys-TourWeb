"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [tourData, setTourData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const thumbnailImages = [
    "https://cdn.mongolia-guide.com/generated/aimag/yB5tmMud3F7rJsh124LfK4ML8rLIdCKXHqTaw3tX_1920_1000.jpeg",
    "https://www.stepperiders.mn/public/storage/scJB23uf9SGsD1kzSparTueVnLzkzgRlOM2pyJVM.jpg",
    "https://cdn.bookatrekking.com/data/images/2019/08/gobi-desert-new.webp",
    "https://www.toursmongolia.com/uploads/landscape%20mongolian%20gobi%20nature%20destination.jpg",
  ];

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
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }
      const responseData = await response.json();

      const realData = responseData || [];
      setTourData(realData);

      setError(null);
    } catch (error) {
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
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        tourData.length > 0 ? (prevIndex + 1) % tourData.length : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [tourData.length]);

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
                  <a
                    href="/view-all"
                    className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg shadow-lg text-white text-lg inline-block"
                    aria-label="Jump to all tours"
                  >
                    Jump to all tours
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[250px] md:right-0">
            <div className="grid grid-cols-2 gap-4">
              {thumbnailImages.map((image, index) => (
                <Link
                  key={index}
                  href="/view-all"
                  className="w-32 h-32 md:w-40 md:h-40"
                >
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
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
