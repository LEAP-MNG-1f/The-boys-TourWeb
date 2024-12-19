import { TourScheduleBook } from "./TourScheduleBook";

export const TourPrice = ({ tour }) => {
  return (
    <div className="w-full max-w-[468px] flex flex-col gap-5">
      <div className="shadow-[-4px_-5px_14px_rgb(0,0,0,8%),5px_8px_16px_rgb(0,0,0,8%)] bg-white p-3 md:p-5 rounded-2xl flex flex-col gap-3 md:gap-6">
        <div className="flex">
          <div className="pb-1 md:pb-3 border-b border-[#F97316]">
            <p className="text-black font-roboto text-xl md:text-2xl font-semibold leading-6">
              Tour price
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {tour?.price?.map((value, id) => {
            return (
              <div
                key={id}
                className="flex items-center justify-between border-b border-[rgba(0,0,0,0.125)] pb-2"
              >
                <p className="text-black font-roboto text-base font-medium">
                  {value.pax} pax
                </p>
                <p className="text-black font-roboto text-base font-medium">
                  {value.perPerson}$
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <TourScheduleBook tour={tour} />
    </div>
  );
};
