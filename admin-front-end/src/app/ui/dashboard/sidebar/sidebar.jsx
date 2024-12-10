import React from "react";
import {
  Binoculars,
  CircleDollarSign,
  LayoutDashboard,
  LogOut,
  Users,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="bg-[#182237] flex flex-col p-5 ">
      <div className="flex flex-col gap-5">
        <div className="flex gap-3">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            className="h-12 w-12 rounded-full"
            alt=""
          />
          <div className="flex flex-col justify-center">
            <div className="text-sm ">Ydmaa</div>
            <div className="text-xs font-extralight text-[#b7bac1] ">
              Administrator
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <h2 className="text-[#b7bac1] text-xs font-bold">Pages</h2>
            <div className="flex flex-col gap-2">
              <Link href="/dashboard">
                <button className="btn btn-ghost w-full justify-start font-normal hover:bg-slate-700">
                  <LayoutDashboard width={22} />
                  Dashboard
                </button>
              </Link>
              <Link href="/dashboard/users">
                <button className="btn btn-ghost w-full justify-start font-normal hover:bg-slate-700">
                  <Users width={22} />
                  Users
                </button>
              </Link>
              <Link href="/dashboard/tours">
                <button className="btn btn-ghost w-full justify-start font-normal hover:bg-slate-700">
                  <Binoculars width={22} />
                  Tours
                </button>
              </Link>
              <Link href="/dashboard/orders">
                <button className="btn btn-ghost w-full justify-start font-normal hover:bg-slate-700">
                  <CircleDollarSign width={22} />
                  Orders
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-[#b7bac1] text-xs font-bold">User</h2>
            <div className="flex flex-col gap-2">
              <Link href="/login">
                <button className="btn btn-ghost w-full justify-start font-normal hover:bg-slate-700">
                  <LogOut width={22} />
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// bg - #1512c2
// bgsoft - #182237
// textsoft - #b7bac1
