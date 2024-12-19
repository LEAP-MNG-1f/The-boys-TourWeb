"use client";

import React, { useState, useEffect } from "react";
import { LeftArrow, RightArrow } from "../icons";

const Carousel = ({ tour }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (tour.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % tour.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [tour]);

  const currentImage = tour[currentImageIndex];

  console.log(currentImage);

  return (
    <div className="relative overflow-hidden shadow-lg h-[60vh] md:h-[75vh]">
      <div
        className="overflow-hidden shadow-lg md:h-[75vh] h-[60vh]"
        style={{
          // backgroundImage: `url(${currentImage.images})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.5s ease-in-out",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="container mx-auto relative z-10 h-full">
          <div className="flex h-full items-center text-white justify-center  ">
            <div className="flex flex-col gap-24">
              <div className="flex flex-col gap-4">
                <h1 className="text-6xl font-bold font-roboto">{tour.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
