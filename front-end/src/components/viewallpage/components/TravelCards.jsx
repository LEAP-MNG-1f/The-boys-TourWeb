import TourCard from "../card/card";

const TravelCards = () => {
  return (
    <div className="flex gap-12 justify-center">
      <TourCard
        image={
          "https://www.stepperiders.mn/public/storage/scJB23uf9SGsD1kzSparTueVnLzkzgRlOM2pyJVM.jpg"
        }
        description={"Lorem ipsume"}
        price={"100$"}
        date={"2025-10-02"}
      />
      <TourCard
        image={
          "https://www.discovermongolia.mn/uploads/Gall-Central-shireet-lake.jpg"
        }
        description={"Lorem ipsume"}
        price={"100$"}
        date={"2025-10-02"}
      />
      <TourCard
        image={
          "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/t/n/tnc_46175181_Full.jpg?crop=0%2C233%2C4000%2C2200&wid=4000&hei=2200&scl=1.0"
        }
        description={"Lorem ipsume"}
        price={"100$"}
        date={"2025-10-02"}
      />
      <TourCard
        image={
          "https://news.mn/en/wp-content/uploads/sites/3/2022/05/Orkhon-waterfall-Orkhon-valley-Mongolia.jpg"
        }
        description={"Lorem ipsume"}
        price={"100$"}
        date={"2025-10-02"}
      />
      <TourCard
        image={
          "https://good-nature-blog-uploads.s3.amazonaws.com/uploads/2013/10/Camp.jpg"
        }
        description={"Lorem ipsume"}
        price={"100$"}
        date={"2025-10-02"}
      />
    </div>
  );
};
export default TravelCards;
