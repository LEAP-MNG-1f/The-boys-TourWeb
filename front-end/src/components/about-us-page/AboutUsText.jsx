"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CompanyDescriptionsGrid } from "./CompanyDescriptions";

const AboutUsText = ({ companyDescriptions }) => {
  const [activeTab, setActiveTab] = useState("Company");
  const [isLoading, setIsLoading] = useState(true);
  const [teamData, setTeamData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/teams");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const responseData = await response.json();
      setTeamData(responseData || []);
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

  return (
    <div className="w-full min-h-screen px-4 sm:px-8 md:px-[100px] py-8 sm:py-12 md:py-[50px] mt-8 sm:mt-[100px]">
      <div className="container mx-auto">
        <div className="flex justify-end mb-6 sm:mb-10 space-x-4 sm:space-x-6">
          {tabItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(item.text)}
              className={`text-base sm:text-lg font-semibold transition-all duration-300 ease-in-out ${
                activeTab === item.text
                  ? "text-[#FC8233] underline"
                  : "text-gray-600 hover:text-[#FC8233]"
              } hover:scale-105`}
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
            <div className="relative group overflow-hidden rounded-2xl shadow-lg h-[700px] w-[1500px] mx-auto transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl px-4 sm:px-0">
              <motion.img
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src="https://res.cloudinary.com/dmsyul4sr/image/upload/v1734495011/465053790_9080584541981233_7124384568269687891_n_mo0dph.png"
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
                        {member.language}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 italic">
                        Experience: {member.experience}
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
