"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const WalkDifference = () => {
  const carouselImages = [
    "https://news.mn/en/wp-content/uploads/sites/3/2021/08/2.jpg",
    "https://media.cnn.com/api/v1/images/stellar/prod/elysian-e9x-render-1.jpg?c=original",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="container mx-auto  py-12 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
        <div className="h-64 md:h-80 lg:h-[450px] rounded-[20px] overflow-hidden ">
          <div className="h-[490px] w-[500px] bg-orange-500 absolute rounded-[20px] ml-[80px] "></div>
          <div className="pt-[30px]">
            <img
              src={carouselImages[currentImage]}
              alt="Carousel Image"
              className="w-full h-full object-cover relative  rounded-[20px]"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">
            Plan <span className="text-orange-500">Your Trip</span>
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
          <Link href="/specialtour">
            <button className="bg-orange-500 w-[210px] text-white px-[30px] py-[10px] text-center rounded-[20px] shadow-md hover:bg-orange-600">
              Create your own trip
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-[200px]">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-[80px] font-[400]">The Walk</h1>
            <h1 className="text-[80px] font-[400] ml-[220px] text-orange-500">
              Difference
            </h1>
          </div>
        </div>

        <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
          <img
            src="https://news.mn/en/wp-content/uploads/sites/3/2021/08/2.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 ">
            <h2 className="font-bold text-lg">Lorem Ipsum</h2>
            <p className="text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="p-4 ">
            <h2 className="font-bold text-lg">Lorem Ipsum</h2>
            <p className="text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 ">
            <h2 className="font-bold text-lg">Lorem Ipsum</h2>
            <p className="text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="p-4 ">
            <h2 className="font-bold text-lg">Lorem Ipsum</h2>
            <p className="text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkDifference;
