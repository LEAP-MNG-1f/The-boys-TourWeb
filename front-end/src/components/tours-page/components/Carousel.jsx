"use client";

import React, { useState, useEffect } from "react";
import { LeftArrow, RightArrow } from "../icons";

const Carousel = ({ tour }) => {
  const slides = [
    {
      title: "MONGOLIAN GOBI",
      description:
        "Explore the vast and mysterious landscapes of the Gobi Desert.",
      buttonText: "Book now",
      imageUrl:
        "https://cdn.bookatrekking.com/data/images/2019/08/gobi-desert-new.webp",
    },
    {
      title: "KHUVSGUL LAKE",
      description:
        "Discover the tranquility of pristine lakes and calm waters.",
      buttonText: "Book now",
      imageUrl:
        "https://cdn.mongolia-guide.com/generated/aimag/yB5tmMud3F7rJsh124LfK4ML8rLIdCKXHqTaw3tX_1920_1000.jpeg",
    },
    {
      title: "LUSH FORESTS",
      description: "Escape into the wilderness of vibrant, peaceful forests.",
      buttonText: "Book now",
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

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative overflow-hidden shadow-lg h-[75vh]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${slides[currentIndex].imageUrl})`,
          backgroundSize: "cover",
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
        <button
          className="absolute left-10 top-[50%] translate-y-[-50%] bg-white w-10 h-10 flex justify-center items-center rounded-full shadow-md"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          <LeftArrow />
        </button>
        <button
          className="absolute right-10 top-[50%] translate-y-[-50%] bg-white w-10 h-10 flex justify-center items-center rounded-full shadow-md"
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          <RightArrow />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
