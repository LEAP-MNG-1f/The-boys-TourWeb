"use client";

import React, { useState, useEffect } from "react";
import { LeftArrow, RightArrow } from "../icons";

const Carousel = ({ tour }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = tour.images || []; // Use images array from the tour object

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [images]);

  if (images.length === 0) {
    return <p>No images to display</p>;
  }

  return (
    <div className="relative overflow-hidden shadow-lg h-[60vh] md:h-[75vh]">
      <div
        className="h-full"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.5s ease-in-out",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="container mx-auto relative z-10 h-full px-2">
          <div className="flex h-full items-center text-white justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold font-roboto">{tour.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() =>
          setCurrentImageIndex(
            (currentImageIndex - 1 + images.length) % images.length
          )
        }
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 text-white bg-white rounded-full md:w-12 md:h-12 w-8 h-8 flex justify-center items-center"
      >
        <LeftArrow />
      </button>
      <button
        onClick={() =>
          setCurrentImageIndex((currentImageIndex + 1) % images.length)
        }
        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 text-white bg-white rounded-full md:w-12 md:h-12 w-8 h-8 flex justify-center items-center"
      >
        <RightArrow />
      </button>
    </div>
  );
};

export default Carousel;
