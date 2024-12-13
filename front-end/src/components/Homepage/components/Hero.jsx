"use client";
import { Card } from "../card/Card";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/categories", {
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
      const realData = responseData?.data || responseData || [];

      const uniqueCategories = Array.from(
        new Set(realData.map((item) => item.name || item.categoryName))
      );

      setCategories(uniqueCategories);
      setError(null);
      console.log("Categories:", uniqueCategories);
    } catch (error) {
      console.error("Detailed fetch error:", error);
      setError(`Failed to load categories: ${error.message}`);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(categories);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 sm:pb-32 flex flex-col shadow-xl rounded-xl sm:rounded-2xl">
      <div className="flex items-center justify-center space-x-2 mb-6">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-black">
          Choose Your
        </h1>
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-orange-500">
          Tour
        </h1>
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4 px-4 sm:px-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedSeason(category)}
                className={`
                  border-2 text-gray-800 py-2 px-4 sm:px-6 rounded-lg font-medium 
                  transition duration-300 text-sm sm:text-base
                  ${
                    selectedSeason === category
                      ? "bg-orange-500 text-white border-orange-500"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="px-4 sm:px-8 lg:px-16">
            <Card
              selectedSeason={selectedSeason}
              selectedCategory={selectedCategory}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
