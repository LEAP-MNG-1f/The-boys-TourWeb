"use client";
import { useEffect, useState } from "react";

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
        " Through our travel services, we proudly showcase Mongolia's unique culture, breathtaking landscapes, and rich heritage. We prioritize sustainable practices, safety, and creating meaningful connections that inspire exploration and cultural understanding.",
    },
  ];

  return (
    <div className="w-full min-h-screen px-[100px] py-[50px] mt-[100px] bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-end mb-10 space-x-6">
          {tabItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(item.text)}
              className={`
                text-lg
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {companyDescriptions.map((section, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-bold text-[#FC8233] mb-4">
                    {section.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="relative group overflow-hidden rounded-2xl shadow-lg max-w-4xl mx-auto transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <img
                src="https://www.stepperiders.mn/public/storage/scJB23uf9SGsD1kzSparTueVnLzkzgRlOM2pyJVM.jpg"
                alt="Stepper Riders"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:brightness-90"
              />
            </div>
          </>
        )}

        {activeTab === "Our Team" && (
          <div className="text-center">
            <div className="mt-8 bg-white p-8 rounded-xl shadow-md mb-8">
              <h2 className="text-2xl font-bold text-[#FC8233] mb-6">
                Our Story
              </h2>
              <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {teamData.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                  >
                    <div className="mb-6 overflow-hidden rounded-full w-48 h-48 mx-auto border-4 border-[#FC8233]/30 group-hover:border-[#FC8233]/50 transition-all">
                      <img
                        src={member.imageTeam}
                        className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">
                        {member.name}
                      </h3>
                      <h4 className="text-[#FC8233] font-semibold text-lg mb-2">
                        {member.languege}
                      </h4>
                      <p className="text-gray-600 text-sm italic">
                        experience:
                        {member.exprience}
                      </p>
                    </div>
                  </div>
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
