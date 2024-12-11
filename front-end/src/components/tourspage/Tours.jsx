import { HeaderPart } from "../Homepage/components/Header";
import { Carousel } from "./components/Carousel";
import { Introduction } from "./components/Introduction";

const ProductsPage = () => {
  return (
    <>
      <HeaderPart />
      <div className="flex flex-col gap-5">
        <Carousel />
        <Introduction />
      </div>
    </>
  );
};

export default ProductsPage;
