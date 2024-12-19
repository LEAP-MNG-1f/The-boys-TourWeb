export const Overview = ({ tour }) => {
  return (
    <div className="w-full flex flex-col gap-3 md:gap-6 shadow-[-4px_-5px_14px_rgb(0,0,0,8%),5px_8px_16px_rgb(0,0,0,8%)] bg-white p-3 md:p-5 rounded-2xl">
      <div className="flex flex-col gap-1 md:gap-2">
        <div className="flex">
          <div className="pb-1 md:pb-3 border-b border-[#F97316]">
            <p className="text-black font-roboto text-xl md:text-2xl font-semibold leading-6">
              Overview
            </p>
          </div>
        </div>
      </div>
      <p className="text-black font-roboto text-base md:text-lg font-normal ">
        {tour.description}
      </p>
    </div>
  );
};
