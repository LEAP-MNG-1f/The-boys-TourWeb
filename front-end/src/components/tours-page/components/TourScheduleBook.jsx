import Link from "next/link";

export const TourScheduleBook = ({ tour }) => {
  return (
    <div className="shadow-[-4px_-5px_14px_rgb(0,0,0,8%),5px_8px_16px_rgb(0,0,0,8%)] bg-white p-3 md:p-5 rounded-2xl flex flex-col gap-3 md:gap-6">
      <div className="flex">
        <div className="pb-1 md:pb-3 border-b border-[#F97316]">
          <p className="text-black font-roboto text-xl md:text-2xl font-semibold leading-6">
            Tour schedule
          </p>
        </div>
      </div>
      <div className="border-b border-[rgba(0,0,0,0.125)] pb-2 flex items-center gap-1">
        <p className="text-black font-roboto text-base font-normal">
          {tour.startDate}
        </p>
        {tour.endDate ? (
          <p className="text-black font-roboto text-base font-normal">
            - {tour.endDate}
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="flex items-center gap-4">
        <button className="w-full h-12"></button>
        <Link href={`/${tour?.title}`} className="w-full">
          <button className="w-full h-12 bg-[#F97316] hover:bg-orange-600 transition-all duration-300 rounded-lg text-white font-roboto text-xl font-medium">
            Book now
          </button>
        </Link>
      </div>
    </div>
  );
};
