import Footer from "../Homepage/components/Footer";
import { HeaderPart } from "../Homepage/components/Header";
import AboutUsText from "./AboutUsText";

const AboutUs = () => {
  const companyDescriptions = [
    {
      title: "Our Mission",
      description:
        "We are dedicated to creating unforgettable experiences for international travelers in Mongolia. Through our safe, professional, and reliable services, we ensure every journey is enriched with discovery, joy, and cultural connection.",
    },
    {
      title: "Our Vision",
      description:
        "Our vision is to provide a comprehensive range of natural and personalized travel services that cater to both international and domestic travelers. We strive to become a technology-driven global leader in the tourism industry, offering innovative and exceptional travel solutions that inspire exploration and foster trust.",
    },
    {
      title: "Our Values",
      description:
        "Through our travel services, we proudly showcase Mongolia's unique culture, breathtaking landscapes, and rich heritage. We prioritize sustainable practices, safety, and creating meaningful connections that inspire exploration and cultural understanding.",
    },
  ];

  return (
    <div>
      <HeaderPart
        home={false}
        customTour={false}
        event={false}
        aboutUs={true}
      />
      <div className="flex flex-col gap-[100px]">
        <AboutUsText companyDescriptions={companyDescriptions} />
        <Footer />
      </div>
    </div>
  );
};
export default AboutUs;
