import { Users2Icon } from "lucide-react";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="mt-5 w-[60vw] flex flex-col">
      <div className="flex w-full gap-4 justify-between ">
        <div className="w-full bg-[#182237] rounded-lg p-4 flex gap-4 ">
          <div>
            <Users2Icon />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-normal">Total Users</div>
            <div className="text-2xl font-semibold">10928</div>
            <div className="flex gap-1">
              <div className="text-success">12% </div> more than previous week
            </div>
          </div>
        </div>
        <div className="w-full bg-[#182237] rounded-lg p-4 flex gap-4 ">
          <div>
            <Users2Icon />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-normal">Total Users</div>
            <div className="text-2xl font-semibold">10928</div>
            <div className="flex gap-1">
              <div className="text-success">12% </div> more than previous week
            </div>
          </div>
        </div>
        <div className="w-full bg-[#182237] rounded-lg p-4 flex gap-4 ">
          <div>
            <Users2Icon />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-normal">Total Users</div>
            <div className="text-2xl font-semibold">10928</div>
            <div className="flex gap-1">
              <div className="text-success">12% </div> more than previous week
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DashboardPage;

// bg - #1512c2
// bgsoft - #182237
// textsoft - #b7bac1
