import Specail from "@/components/head/Specialtour";
import Footer from "@/components/Homepage/components/Footer";
import { HeaderPart } from "@/components/Homepage/components/Header";

export default function Home() {
  return (
    <div>
      <HeaderPart />
      <div className="pt-[40px] pb-[100px]">
        <Specail />
      </div>
      <Footer />
    </div>
  );
}
