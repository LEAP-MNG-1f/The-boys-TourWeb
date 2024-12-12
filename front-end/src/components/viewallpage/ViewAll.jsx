import Footer from "../Homepage/components/Footer";
import TravelCards from "./components/TravelCards";

import ViewAllPicture from "./components/ViewAllPicture";

const { HeaderPart } = require("../Homepage/components/Header");

const ViewallPage = () => {
  return (
    <div>
      <HeaderPart />
      <div className="flex gap-10 flex-col">
        <ViewAllPicture />
        <TravelCards />
      </div>
      <Footer />
    </div>
  );
};
export default ViewallPage;
