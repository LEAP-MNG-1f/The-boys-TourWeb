"use client";

import { useEffect, useState } from "react";
import Footer from "../Homepage/components/Footer";
import { HeaderPart } from "../Homepage/components/Header";
import { Details } from "./components/Details";

const BookNowPage = () => {
  const [dataCart, setDataCart] = useState([]);
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
    <div className="flex flex-col">
      <HeaderPart />
      <Details tour={tour} />
      <Footer />
    </div>
  );
};

export default BookNowPage;
