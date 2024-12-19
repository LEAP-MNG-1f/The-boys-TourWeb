"use client";

import { useEffect, useState } from "react";
import Footer from "../Homepage/components/Footer";
import { HeaderPart } from "../Homepage/components/Header";
import Carousel from "./components/Carousel";
import { Introduction } from "./components/Introduction";
import { useParams, useRouter } from "next/navigation";

const TourPage = () => {
  // const router = useRouter();
  const params = useParams();
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true); // Ачааллаж байгааг харуулах төлөв
  const baseUrl = "http://localhost:8000/api"; // API үндсэн зам

  // Fetch Tour Data
  const fetchDataTour = async () => {
    try {
      const response = await fetch(`${baseUrl}/tours/${params.id}`);

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
      const response = await fetch(`${baseUrl}/views`, {
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

        // Increment view count with pageId
        await incrementPageView("tour");
      } catch (error) {
        console.error("Failed to fetch data or increment views:", error);
      } finally {
        setLoading(false); // Ачаалал дууссаны дараа false болгоно
      }
    };

    fetchAndIncrement();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <HeaderPart />
      {loading ? ( // Ачаалал явагдаж байгаа эсэхийг харуулна
        <div className="text-center">Loading...</div>
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
