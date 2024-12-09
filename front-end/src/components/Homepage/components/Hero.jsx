import { Card } from "../card/Card";

export const Hero = () => {
  return (
    <div className="container mx-auto pt-[80px] pb-[250px] flex flex-col">
      <div>
        <h1 className="font-[500] text-[48px]">Choose your tour</h1>
      </div>
      <div className="flex gap-[20px] pt-[25px]">
        <button className="bg-[#FC8233] py-[6px] px-[24px] rounded-[12px]">
          Summer
        </button>
        <button className="bg-[#FC8233] py-[6px] px-[24px] rounded-[12px]">
          Autmn
        </button>
        <button className="bg-[#FC8233] py-[6px] px-[24px] rounded-[12px]">
          Winter
        </button>
        <button className="bg-[#FC8233] py-[6px] px-[24px] rounded-[12px]">
          Spring
        </button>
      </div>
      <div className="flex justify-between">
        <Card
          image={
            "https://www.stepperiders.mn/public/storage/scJB23uf9SGsD1kzSparTueVnLzkzgRlOM2pyJVM.jpg"
          }
          description={"Lorem ipsume"}
          price={100}
        />
        <Card
          image={
            "https://www.discovermongolia.mn/uploads/Gall-Central-shireet-lake.jpg"
          }
          description={"Lorem ipsume"}
          price={100}
        />
        <Card
          image={
            "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/t/n/tnc_46175181_Full.jpg?crop=0%2C233%2C4000%2C2200&wid=4000&hei=2200&scl=1.0"
          }
          description={"Lorem ipsume"}
          price={100}
        />
        <Card
          image={
            "https://news.mn/en/wp-content/uploads/sites/3/2022/05/Orkhon-waterfall-Orkhon-valley-Mongolia.jpg"
          }
          description={"Lorem ipsume"}
          price={100}
        />
        <Card
          image={
            "https://good-nature-blog-uploads.s3.amazonaws.com/uploads/2013/10/Camp.jpg"
          }
          description={"Lorem ipsume"}
          price={100}
        />
      </div>
    </div>
  );
};
