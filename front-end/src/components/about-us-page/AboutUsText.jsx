"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import imageSrc from "../../../public/baigal.png";

const AboutUsText = () => {
  const [activeTab, setActiveTab] = useState("Company");
  const [isLoading, setIsLoading] = useState(true);
  const [teamData, setTeamData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/teams", {
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
      setTeamData(realData);
      setError(null);
    } catch (error) {
      console.error("Detailed fetch error:", error);
      setError(`Failed to load team members: ${error.message}`);
      setTeamData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tabItems = [
    { text: "Company", isBold: true },
    { text: "Our Team", isBold: false },
  ];

  const companyDescriptions = [
    {
      title: "Our Mission",
      description:
        "We are dedicated to creating unforgettable experiences for international travelers in Mongolia. Through our safe, professional, and reliable services, we ensure every journey is enriched with discovery, joy, and cultural connection.",
    },
    {
      title: "Our Vision",
      description:
        "Our vision is to provide a comprehensive range of natural and personalized travel services that cater to both international and domestic travelers. We strive to become a technology-driven global leader in the tourism industry, offering innovative and exceptional travel solutions that inspire exploration and foster trust.",
    },
    {
      title: "Our Values",
      description:
        "Through our travel services, we proudly showcase Mongolia's unique culture, breathtaking landscapes, and rich heritage. We prioritize sustainable practices, safety, and creating meaningful connections that inspire exploration and cultural understanding.",
    },
  ];

  const CompanyDescriptionsGrid = ({ companyDescriptions }) => {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {companyDescriptions.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              className="group"
            >
              <div className="bg-white p-4 sm:p-6 rounded-2xl min-h-[300px] flex flex-col justify-between border border-gray-100 shadow-lg hover:shadow-2xl hover:border-[#FC8233]/20transition-all duration-300 transform hover:-translate-y-2 space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FC8233]/10 rounded-full flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-[#FC8233]/20 transition-colors duration-300">
                    <span className="text-[#FC8233] text-xl sm:text-2xl font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-[#FC8233] transition-colors">
                    {section.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {section.description}
                </p>
                <div className="h-1 w-full bg-[#FC8233]/10 rounded-full overflow-hidden ">
                  <div className="h-full bg-[#FC8233] w-0 group-hover:w-full transition-all  duration-500"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen px-4 sm:px-8 md:px-[100px] py-8 sm:py-12 md:py-[50px] mt-8 sm:mt-[100px]">
      <div className="container mx-auto">
        <div className="flex justify-end mb-6 sm:mb-10 space-x-4 sm:space-x-6">
          {tabItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(item.text)}
              className={`
                text-base sm:text-lg
                font-semibold
                transition-all
                duration-300
                ease-in-out
                ${
                  activeTab === item.text
                    ? "text-[#FC8233] underline"
                    : "text-gray-600 hover:text-[#FC8233]"
                }
                hover:scale-105
              `}
            >
              {item.text}
            </button>
          ))}
        </div>

        {activeTab === "Company" && (
          <>
            <CompanyDescriptionsGrid
              companyDescriptions={companyDescriptions}
            />
            <div className=" relative group overflow-hidden rounded-2xl shadow-lg h-[700px] w-[1500px] mx-auto transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl px-4 sm:px-0">
              <motion.img
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src="blob:https://www.facebook.com/fb7dcfd3-8b63-40bb-a338-8c424c2058b1"
                alt="Stepper Riders"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:brightness-90"
              />
            </div>
          </>
        )}

        {activeTab === "Our Team" && (
          <div className="text-center">
            <div className="mt-8 bg-white p-6 sm:p-8 rounded-xl shadow-md mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#FC8233] mb-4 sm:mb-6">
                Our Story
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-4xl mx-auto">
                We are the travel company established in own experience work in
                tourism sector in 2022. We currently offering Natural and
                Customized Tour for international travelers. We are able to
                create especially Moto Tour, Horse Tour and some short
                customized adventure tours based on travelers interest.
              </p>
            </div>

            {isLoading ? (
              <div className="text-center text-gray-600 mt-8">
                Loading team members...
              </div>
            ) : error ? (
              <div className="text-center text-red-600 mt-8">{error}</div>
            ) : teamData.length === 0 ? (
              <div className="text-center text-gray-600 mt-8">
                No team members found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-8 px-4 sm:px-0">
                {teamData.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2,
                      ease: "easeOut",
                    }}
                    className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                  >
                    <div className="mb-4 sm:mb-6 overflow-hidden rounded-full w-32 h-32 sm:w-48 sm:h-48 mx-auto border-4 border-[#FC8233]/30 group-hover:border-[#FC8233]/50 transition-all">
                      <img
                        src={member.imageTeam}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                        {member.name}
                      </h3>
                      <h4 className="text-[#FC8233] font-semibold text-base sm:text-lg mb-2">
                        {member.languege}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 italic">
                        experience: {member.exprience}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUsText;
