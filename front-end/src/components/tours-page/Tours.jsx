"use client";

import { useEffect, useState } from "react";
import Footer from "../Homepage/components/Footer";
import { HeaderPart } from "../Homepage/components/Header";
import Carousel from "./components/Carousel";
import { Introduction } from "./components/Introduction";
// import { useRouter } from "next/router";

const ProductsPage = () => {
  // const router = useRouter();
  const [tour, setTour] = useState([]);

  const fetchDataTour = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/tours/Gobi-Tour`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const tour = await response.json();
      setTour(tour);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataTour();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <HeaderPart />
      <div className="flex flex-col gap-5">
        <Carousel tour={tour} />
        <Introduction tour={tour} />
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
