"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  GlobeAltIcon,
  RocketLaunchIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

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

  const sections = [
    {
      icon: RocketLaunchIcon,
      title: "Our Mission",
      description:
        "We are dedicated to creating unforgettable experiences for international travelers in Mongolia. Through our safe, professional, and reliable services, we ensure every journey is enriched with discovery, joy, and cultural connection.",
    },
    {
      icon: EyeIcon,
      title: "Our Vision",
      description:
        "Our vision is to provide a comprehensive range of natural and personalized travel services that cater to both international and domestic travelers. We strive to become a technology-driven global leader in the tourism industry, offering innovative and exceptional travel solutions that inspire exploration and foster trust.",
    },
    {
      icon: GlobeAltIcon,
      title: "Our Values",
      description:
        "Through our travel services, we proudly showcase Mongolia's unique culture, breathtaking landscapes, and rich heritage. We prioritize sustainable practices, safety, and creating meaningful connections that inspire exploration and cultural understanding.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 md:px-8">
      {/* First Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        <div className="relative h-64 md:h-80 lg:h-[450px] rounded-[20px] overflow-hidden">
          <div className="absolute inset-0 bg-orange-500 rounded-[20px] ml-[20px] sm:ml-[40px] lg:ml-[80px]"></div>
          <div className="relative pt-[10px] sm:pt-[30px]">
            <img
              src={carouselImages[currentImage]}
              alt="Carousel Image"
              className="w-full h-full object-cover rounded-[20px]"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Plan <span className="text-orange-500">Your Trip</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-6 px-2 sm:px-0">
            Design your dream adventure in Mongolia! Our customizable tour
            planning lets you choose destinations, activities, and experiences
            tailored to your interests. Whether you seek cultural immersion,
            breathtaking landscapes, or thrilling outdoor adventures, we make it
            possible. Enjoy a hassle-free experience with our expert guidance,
            ensuring every detail is perfect. Start crafting your personalized
            journey and discover the best of Mongolia, your way!
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link href="/specialtour">
              <button className="bg-orange-500 w-[210px] text-white px-[30px] py-[10px] text-center rounded-[20px] shadow-md hover:bg-orange-600">
                Create your own trip
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-20 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-8 pb-10 sm:pb-1 flex flex-col shadow-xl rounded-xl sm:rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mt-12 lg:mt-[100px]">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl lg:text-[80px] font-[400]">
                The Walk
              </h1>
              <h1 className="text-4xl sm:text-6xl lg:text-[80px] font-[400] lg:ml-[220px] text-orange-500">
                Difference
              </h1>
            </div>
          </div>
          <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden order-1 lg:order-2">
            <img
              src="https://news.mn/en/wp-content/uploads/sites/3/2021/08/2.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Sections */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <section.icon className="h-8 w-8 sm:h-10 sm:w-10 text-orange-600 mr-2 sm:mr-4 bg-orange-100 p-2 rounded-full" />
                  <h2 className="font-bold text-xl sm:text-2xl text-gray-800">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkDifference;
