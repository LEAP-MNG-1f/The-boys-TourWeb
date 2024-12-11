import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import { HeaderPart } from "./components/Header";
import { Hero } from "./components/Hero";
import WorkingProcess from "./components/Process";
import WalkDifference from "./components/Walk";

export default function Homepage() {
  return (
    <div>
      <HeaderPart />
      <div className="pt-[100px]">
        <Carousel />
      </div>
      <div className="py-[50px]">
        <Hero />
      </div>
      <WalkDifference />
      <WorkingProcess />
      <Footer />
    </div>
  );
}
