import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import { HeaderPart } from "./components/Header";
import { Hero } from "./components/Hero";
import WorkingProcess from "./components/Process";
import WalkDifference from "../head/Walk";

export default function Homepage() {
  return (
    <div>
      <HeaderPart
        home={true}
        customTour={false}
        event={false}
        aboutUs={false}
      />
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
