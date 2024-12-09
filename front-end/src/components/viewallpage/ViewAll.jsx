import Footer from "../Homepage/components/Footer";
import TravelCards from "./components/TravelCards";
import ViewAllPicture from "./components/ViewAllPicture";

const { HeaderPart } = require("../Homepage/components/Header");

const ViewallPage = () => {
  return (
    <div>
      <HeaderPart />
      <ViewAllPicture />
      <TravelCards />
      <Footer />
    </div>
  );
};
export default ViewallPage;
