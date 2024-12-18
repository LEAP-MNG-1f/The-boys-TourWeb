import Footer from "../Homepage/components/Footer";
import { HeaderPart } from "../Homepage/components/Header";
import AboutUsText from "./AboutUsText";

const AboutUs = () => {
  return (
    <div>
      <HeaderPart
        home={false}
        customTour={false}
        event={false}
        aboutUs={true}
      />
      <div className="flex flex-col gap-[100px]">
        <AboutUsText />
        <Footer />
      </div>
    </div>
  );
};
export default AboutUs;
