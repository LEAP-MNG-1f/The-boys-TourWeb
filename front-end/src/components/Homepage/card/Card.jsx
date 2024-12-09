export const Card = ({ image, price, description }) => {
  return (
    <div className=" w-[270px] h-[340px] pt-[50px] ">
      <img
        className="w-full h-full object-cover rounded-[24px]"
        src={image}
        alt=""
      />
      <div className="flex flex-col pt-[20px]">
        <div>
          <h1 className="font-[500] ">{description}</h1>
        </div>
        <div className="flex items-center gap-[20px] pt-[10px]">
          <h1 className="font-[600] text-[20px]">{price}$</h1>
          <button className="border border-orange-400 rounded-[12px] py-[5px] px-[15px]">
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};
