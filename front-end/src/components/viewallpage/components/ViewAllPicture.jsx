"use client";
import React, { useState, useEffect } from "react";

const ViewAllPicture = () => {
  const slides = [
    {
      imageUrl:
        "https://cdn.bookatrekking.com/data/images/2019/08/gobi-desert-new.webp",
    },
    {
      imageUrl:
        "https://cdn.mongolia-guide.com/generated/aimag/yB5tmMud3F7rJsh124LfK4ML8rLIdCKXHqTaw3tX_1920_1000.jpeg",
    },
    {
      imageUrl:
        "https://www.stepperiders.mn/public/storage/scJB23uf9SGsD1kzSparTueVnLzkzgRlOM2pyJVM.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="container mx-auto relative overflow-hidden rounded-[15px] shadow-lg h-[65vh] mt-[100px]">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${slides[currentIndex].imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 text-white">
          <div className="pt-[50px]">
            <h1 className="text-5xl font-bold mb-4">
              {slides[currentIndex].title}
            </h1>
          </div>
          <p className="text-lg mb-6">{slides[currentIndex].description}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewAllPicture;
