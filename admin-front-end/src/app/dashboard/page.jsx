"use client";
import { Users2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [viewData, setViewData] = useState([]);

  const fetchViews = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/views");
      const data = await response.json();
      setViewData(data);
    } catch (error) {
      console.error("Error fetching views:", error);
    }
  };

  useEffect(() => {
    fetchViews();
  }, []);

  // Calculate total view count
  const totalViews =
    viewData.length > 0
      ? viewData[0].views.reduce((sum, view) => sum + view.count, 0)
      : 0;

  const latestDate =
    viewData.length > 0 && viewData[0].views.length > 0
      ? viewData[0].views[0].date
      : "N/A";

  return (
    <div className="mt-5 w-[60vw] flex flex-col">
      <div className="flex w-full gap-4 justify-between ">
        <div className="w-full bg-[#182237] rounded-lg p-4 flex gap-4 ">
          <div>
            <Users2Icon />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-normal">
              <p>Total View for tour page</p>
            </div>
            <div className="flex gap-5">
              <div className="text-2xl font-semibold">
                total view: {totalViews}
              </div>
              <div className="text-2xl font-semibold">date: {latestDate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

// bg - #1512c2
// bgsoft - #182237
// textsoft - #b7bac1
