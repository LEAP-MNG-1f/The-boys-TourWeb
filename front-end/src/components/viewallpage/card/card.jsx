const TourCard = ({ image, description, price, date }) => {
  return (
    <div className="w-[270px] h-[340px] pt-[50px] ">
      <div className="relative">
        <img
          className="w-full h-[240px] object-cover rounded-[24px] shadow-md"
          src={image}
          alt={description}
        />
        <div className="absolute bottom-4 left-4 flex items-center gap-[100px] font-bold  bg-opacity-50 text-white px-3 py-2 rounded-lg">
          <div>
            <h2 className="text-sm font-medium">{description}</h2>
            <h2 className="font-light">{date}</h2>
          </div>
          <div>
            <h2>{price}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
