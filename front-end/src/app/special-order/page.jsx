import Footer from "@/components/Homepage/components/Footer";
import { HeaderPart } from "@/components/Homepage/components/Header";
import Specialtour from "@/components/special-order-page/Specialtour";

export default function Home() {
  return (
    <div>
      <HeaderPart />
      <div className="pt-[40px] pb-[100px]">
        <Specialtour />
      </div>
      <Footer />
    </div>
  );
}
