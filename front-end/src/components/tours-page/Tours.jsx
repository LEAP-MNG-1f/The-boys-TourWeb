"use client";

import Footer from "../Homepage/components/Footer";
import { HeaderPart } from "../Homepage/components/Header";
import Carousel from "./components/Carousel";
import { Introduction } from "./components/Introduction";

const ProductsPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <HeaderPart />
      <div className="flex flex-col gap-5">
        <Carousel />
        <Introduction />
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
