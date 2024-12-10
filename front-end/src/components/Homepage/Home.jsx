import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import { HeaderPart } from "./components/Header";
import { Hero } from "./components/Hero";
import WorkingProcess from "./components/Process";
import WalkDifference from "./components/Walk";

export const HomePage = () => {
  return (
    <div>
      <HeaderPart />
      <Carousel />
      <Hero />
      <WalkDifference />
      <WorkingProcess />
      <Footer />
    </div>
  );
};