import WalkDifference from "../head/Walk";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import { HeaderPart } from "./components/Header";
import { Hero } from "./components/Hero";
import WorkingProcess from "./components/Process";

export default function Homepage() {
  return (
    <div>
      <HeaderPart />
      <Carousel />
      <div className="py-[50px]">
        <Hero />
      </div>
      <WalkDifference />
      <div className="py-[50px]">
        <WorkingProcess />
      </div>
      <Footer />
    </div>
  );
}
