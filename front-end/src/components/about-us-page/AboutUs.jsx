import AboutUsText from "./AboutUsText";

const { default: Footer } = require("../Homepage/components/Footer");
const { HeaderPart } = require("../Homepage/components/Header");

const AboutUs = () => {
  return (
    <div>
      <HeaderPart />
      <div className="flex flex-col gap-[100px]">
        <AboutUsText />
        <Footer />
      </div>
    </div>
  );
};
export default AboutUs;
