"use client";
import { Users2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [viewData, setViewData] = useState([]);

  const fetchViews = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/views`
      );
      const data = await response.json();

      // Optional: Client-side filtering
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const filteredData = data.map((item) => ({
        ...item,
        views: item.views.filter((view) => {
          const viewDate = new Date(view.date);
          return viewDate >= thirtyDaysAgo;
        }),
      }));

      setViewData(filteredData);
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

  return (
    <div className="mt-5 w-[60vw] flex flex-col gap-4">
      <div className="flex w-full gap-4 justify-between ">
        <div className="w-full bg-[#182237] rounded-lg p-4 flex gap-4 ">
          <div>
            <Users2Icon />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-normal">
              <p>Total View for tour page</p>
            </div>
            <div className="text-2xl font-semibold">{totalViews}</div>
          </div>
        </div>
      </div>

      {/* Views Breakdown */}
      <div className="bg-[#182237] rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Views Breakdown</h2>
        {viewData.length > 0 &&
          viewData[0].views.map((view, index) => (
            <div
              key={index}
              className="bg-[#1f2a3c] p-3 flex gap-5 mb-2 rounded-lg"
            >
              <div className="flex gap-5">
                <span className="text-gray-400">Date:</span>
                <span className="font-semibold">{view.date}</span>
              </div>
              <div className="flex gap-5">
                <span className="text-gray-400">Views:</span>
                <span className="font-semibold text-blue-400">
                  {view.count}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardPage;
