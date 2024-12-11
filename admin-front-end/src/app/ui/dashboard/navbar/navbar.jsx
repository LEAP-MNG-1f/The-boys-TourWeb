"use client";

import { MessageSquareText, Search, SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full bg-[#182237] h-[70px] rounded-lg px-6 flex items-center justify-between ">
      <div>{pathname.split("/").pop()}</div>
      <div className="flex gap-6 items-center">
        <label className="input input-bordered bg-[#2e374a] p-3 flex items-center gap-2">
          <input type="text" className="bg-transparent" placeholder="Search" />
          <SearchIcon width={20} />
        </label>
        <button>
          <MessageSquareText width={22} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;

// bg - #1512c2
// bgsoft - #182237
// textsoft - #b7bac1
