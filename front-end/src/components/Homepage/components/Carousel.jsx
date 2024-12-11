"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Carousel = () => {
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

  const thumbnailImages = [
    "https://cdn.mongolia-guide.com/generated/aimag/yB5tmMud3F7rJsh124LfK4ML8rLIdCKXHqTaw3tX_1920_1000.jpeg",
    "https://www.stepperiders.mn/public/storage/scJB23uf9SGsD1kzSparTueVnLzkzgRlOM2pyJVM.jpg",
    "https://cdn.bookatrekking.com/data/images/2019/08/gobi-desert-new.webp",
    "https://www.toursmongolia.com/uploads/landscape%20mongolian%20gobi%20nature%20destination.jpg",
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
          <div className="flex h-full items-center text-white justify-between  ">
            <div className=" flex w-[50%] md:w-1/2 flex-col">
              <div className="flex flex-col gap-[15px] pb-[165px]">
                <h1 className="text-[30px] md:text-5xl font-bold">
                  {slides[currentIndex].title}
                </h1>
                <p className="text-[25px] ">
                  {slides[currentIndex].description}
                </p>
              </div>
              <div className="absolute top-[580px] flex items-end">
                <div className="flex gap-[20px] flex-col ">
                  <button
                    className="bg-orange-500 w-[155px] hover:bg-orange-600 px-6 py-3 rounded-lg shadow-lg text-white text-lg"
                    aria-label="Book Tour"
                  >
                    {slides[currentIndex].buttonText}
                  </button>

                  <div className="absolute top-[130px] flex space-x-2">
                    <button
                      className="bg-white text-black w-10 h-10 flex justify-center items-center rounded-full shadow-md"
                      onClick={prevSlide}
                      aria-label="Previous Slide"
                    >
                      &#8592;
                    </button>
                    <button
                      className="bg-white text-black w-10 h-10 flex justify-center items-center rounded-full shadow-md"
                      onClick={nextSlide}
                      aria-label="Next Slide"
                    >
                      &#8594;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[250px]  md:right-0 ">
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
                    alt={`Tour Thumbnail ${index + 1}`}
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
