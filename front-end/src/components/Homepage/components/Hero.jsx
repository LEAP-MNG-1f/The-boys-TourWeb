"use client";
import { useEffect, useState } from "react";
import { Card } from "../card/Card";

export const Hero = () => {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tourData, setTourData] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchData = async () => {
    try {
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
      setCategories(responseData.data);
      setError(null);
    } catch (error) {
      console.error("Detailed fetch error:", error);
      setError(`Failed to load categories: ${error.message}`);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTourData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/tours", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response text:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const responseData = await response.json();

      // Set all fetched tours data directly
      setTourData(responseData);
      setIsLoading(false);
    } catch (error) {
      console.error("Detailed fetch error:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      setError(`Failed to load tours: ${error.message}`);
      setIsLoading(false);
    }
  };

  const filteredTours =
    filter === "all"
      ? tourData
      : tourData.filter((tour) => tour.categoryId?._id === filter);

  useEffect(() => {
    fetchData();
    fetchTourData();
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

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4 px-4 sm:px-0">
        <button
          onClick={() => setFilter("all")}
          className={`border-2 text-gray-800 py-2 px-4 sm:px-6 rounded-lg font-medium transition duration-300 text-sm sm:text-base ${
            filter === "all"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-orange-100"
          }`}
        >
          all
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => setFilter(category._id)}
            className={`border-2 text-gray-800 py-2 px-4 sm:px-6 rounded-lg font-medium transition duration-300 text-sm sm:text-base ${
              filter === category._id
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-orange-100"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="px-4 sm:px-8 lg:px-16">
        <Card selectedCategory={selectedSeason} tourData={filteredTours} />
      </div>
    </div>
  );
};
