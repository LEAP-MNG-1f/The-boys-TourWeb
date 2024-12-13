import Footer from "../Homepage/components/Footer";
import { HeaderPart } from "../Homepage/components/Header";
import { Details } from "./components/Details";

const BookNowPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <HeaderPart />
      <Details />
      <Footer />
    </div>
  );
};

export default BookNowPage;
