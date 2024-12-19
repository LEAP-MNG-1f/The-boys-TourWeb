"use client";

import { useEffect, useState } from "react";
import Footer from "../Homepage/components/Footer";
import { HeaderPart } from "../Homepage/components/Header";
import { Details } from "./components/Details";
import { BACKEND_URL } from "@/constant";
import { useParams } from "next/navigation";

const BookNowPage = () => {
  const params = useParams();
  const [price, setprice] = useState([]);
  const [tour, setTour] = useState([]);

  const fetchDataTour = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/tours/${params.id}`);

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

  useEffect(() => {
    const savedPrice = JSON.parse(localStorage.getItem("price") || "[]");
    const tourQuantity = (tour.price || []).map((item) => {
      const savedItem = savedPrice.find(
        (priceItem) => priceItem._id === item._id
      );
      return {
        ...item,
        quantity: savedItem ? savedItem.quantity : 0,
      };
    });
    setprice(tourQuantity);
  }, [tour.price]);

  const incrementQuantity = (itemId) => {
    const updatedPrice = price.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem("price", JSON.stringify(updatedPrice));
    setprice(updatedPrice);
  };

  const decrementQuantity = (itemId) => {
    const updatedPrice = price.map((item) =>
      item._id === itemId && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    localStorage.setItem("price", JSON.stringify(updatedPrice));
    setprice(updatedPrice);
  };

  const calculateTotalAmount = () => {
    return price.reduce((sum, item) => sum + item.quantity * item.perPerson, 0);
  };

  return (
    <div className="flex flex-col">
      <HeaderPart />
      <Details
        tour={tour}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        calculateTotalAmount={calculateTotalAmount}
        price={price}
      />
      <Footer />
    </div>
  );
};

export default BookNowPage;
