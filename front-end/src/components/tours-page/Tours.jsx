"use client";

import { useEffect, useState } from "react";
import Footer from "../Homepage/components/Footer";
import { HeaderPart } from "../Homepage/components/Header";
import Carousel from "./components/Carousel";
import { Introduction } from "./components/Introduction";
import { useParams } from "next/navigation";
import { BACKEND_URL } from "@/constant";

const TourPage = () => {
  const params = useParams();
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true); // Ачааллаж байгааг харуулах төлөв

  // Fetch Tour Data
  const fetchDataTour = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/tours/${params.id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTour(data);
    } catch (error) {
      console.error("Failed to fetch tour data:", error);
    }
  };

  // Increment Page Views
  const incrementPageView = async (pageId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/views`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pageId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
    } catch (error) {
      console.error("Failed to increment view count:", error);
    }
  };

  useEffect(() => {
    const fetchAndIncrement = async () => {
      try {
        await fetchDataTour();
        //pageId-eer toolno
        await incrementPageView("tour");
      } catch (error) {
        console.error("Failed to fetch data or increment views:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndIncrement();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <HeaderPart />
      {loading ? ( // Ачаалал явагдаж байгаа эсэхийг харуулна
        <div className="w-full mx-auto relative overflow-hidden shadow-lg h-[65vh] mt-[100px] flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 md:gap-5">
          <Carousel tour={tour} />
          <Introduction tour={tour} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default TourPage;
