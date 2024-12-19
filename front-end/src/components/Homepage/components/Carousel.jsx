"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [tourData, setTourData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(null);
  const [thumbnailImages, setThumbnailImages] = useState([]);
  // const thumbnailImages = [
  //   "https://cdn.mongolia-guide.com/generated/aimag/yB5tmMud3F7rJsh124LfK4ML8rLIdCKXHqTaw3tX_1920_1000.jpeg",
  //   "https://www.stepperiders.mn/public/storage/scJB23uf9SGsD1kzSparTueVnLzkzgRlOM2pyJVM.jpg",
  //   "https://cdn.bookatrekking.com/data/images/2019/08/gobi-desert-new.webp",
  //   "https://www.toursmongolia.com/uploads/landscape%20mongolian%20gobi%20nature%20destination.jpg",
  // ];

  // useEffect(() => {
  //   const fetchThumbnailImages = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:8000/api/tours`);
  //       const data = await response.json();
  //       setThumbnailImages(data);
  //     } catch (error) {
  //       console.error("Error fetching tour data:", error);
  //     }
  //   };

  //   fetchThumbnailImages();
  // }, []);

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
      if (tourData.length > 0) {
        setPrevImageIndex(currentImageIndex);
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % tourData.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [tourData.length, currentImageIndex]);

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

  return (
    <div className="relative overflow-hidden shadow-lg md:h-[75vh] h-[60vh]">
      <div className="relative md:h-[75vh] h-[60vh] w-full overflow-hidden flex justify-center">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/landing-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute px-3 flex flex-col gap-7 justify-center items-center h-full text-white">
          <div className="flex flex-col items-end">
            <h1 className="text-6xl md:text-8xl font-bold text-shadow">
              Discover Mongolia
            </h1>
            <p>& Ride with Us!</p>
          </div>
          <div>
            <Link
              href="/view-all"
              className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-6 py-3 rounded-lg shadow-lg text-white text-lg inline-block"
              aria-label="Jump to all tours"
            >
              Ride to all tours
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
