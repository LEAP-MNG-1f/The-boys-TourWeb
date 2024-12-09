"use client";
import React, { useState, useEffect } from "react";

const Carousel = () => {
  const slides = [
    {
      title: "MONGOLIAN GOBI",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem",
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
    <div className="container mx-auto relative overflow-hidden rounded-[15px] shadow-lg h-[65vh]">
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
          <div className="pt-[50px]">
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg shadow-lg text-white text-lg ">
              {slides[currentIndex].buttonText}
            </button>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              className="bg-white text-black w-10 h-10 flex justify-center items-center rounded-full shadow-md"
              onClick={prevSlide}
            >
              &#8592;
            </button>
            <button
              className="bg-white text-black w-10 h-10 flex justify-center items-center rounded-full shadow-md"
              onClick={nextSlide}
            >
              &#8594;
            </button>
          </div>
        </div>

        <div className="absolute top-0 right-20 h-full flex flex-col justify-center items-center space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-40 h-40 bg-white rounded-lg">
              <img
                className="w-full h-full object-cover rounded-lg"
                src="https://cdn.mongolia-guide.com/generated/aimag/yB5tmMud3F7rJsh124LfK4ML8rLIdCKXHqTaw3tX_1920_1000.jpeg"
                alt=""
              />
            </div>
            <div className="w-40 h-40 bg-white rounded-lg">
              <img
                className="w-full h-full object-cover rounded-lg"
                src="https://www.stepperiders.mn/public/storage/scJB23uf9SGsD1kzSparTueVnLzkzgRlOM2pyJVM.jpg"
                alt=""
              />
            </div>
            <div className="w-40 h-40 bg-white rounded-lg">
              <img
                className="w-full h-full object-cover rounded-lg"
                src="https://cdn.bookatrekking.com/data/images/2019/08/gobi-desert-new.webp"
                alt=""
              />
            </div>
            <div className="w-40 h-40 bg-white rounded-lg">
              <img
                className="w-full h-full object-cover rounded-lg"
                src="https://www.toursmongolia.com/uploads/landscape%20mongolian%20gobi%20nature%20destination.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
