import { CheckIcon, NotCheckIcon } from "../icons";

const TourMapCard = ({ tour }) => {
  return (
    <div>
      <div className="shadow-[-4px_-5px_14px_rgb(0,0,0,8%),5px_8px_16px_rgb(0,0,0,8%)] bg-white p-3 md:p-5 rounded-2xl flex">
        <div className="w-full">
          <div className="flex gap-1">
            <div className="flex gap-3 md:gap-6 flex-col w-full">
              <div className="w-full flex">
                <div className="pb-1 md:pb-3 border-b border-[#F97316]">
                  <p className="text-black font-roboto text-xl md:text-2xl font-semibold leading-6">
                    Service included
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {tour?.serviceInclude?.map((value, id) => {
                  return (
                    <div className="flex items-start gap-2" key={id}>
                      <div className="w-6 h-6 flex items-center justify-center">
                        <CheckIcon />
                      </div>
                      <p className="text-black font-sans text-base md:text-lg font-normal">
                        {value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-3 md:gap-6 flex-col w-full">
              <div className="w-full flex">
                <div className="pb-1 md:pb-3 border-b border-[#F97316]">
                  <p className="text-black font-roboto text-xl md:text-2xl font-semibold leading-6">
                    Service not included
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {tour?.serviceNotInclude?.map((value, id) => {
                  return (
                    <div className="flex items-center gap-2" key={id}>
                      <div className="w-6 h-6 flex items-center justify-center">
                        <NotCheckIcon />
                      </div>
                      <p className="text-black font-sans text-base md:text-lg font-normal ">
                        {value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:mt-5 mt-2 shadow-[-4px_-5px_14px_rgb(0,0,0,8%),5px_8px_16px_rgb(0,0,0,8%)] bg-white p-5 rounded-2xl flex">
        <div className="flex flex-col gap-1 md:gap-2">
          <div className="flex">
            <div className="">
              <div className="flex">
                <div className="pb-1 md:pb-3 border-b border-[#F97316]">
                  <p className="text-black font-roboto text-xl md:text-2xl font-semibold leading-6">
                    Tour map
                  </p>
                </div>
              </div>
              <div className="mt-4 overflow-hidden rounded-lg">
                <img src={tour.location} alt={tour.name} className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourMapCard;
