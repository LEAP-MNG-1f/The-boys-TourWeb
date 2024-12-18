"use client";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useState } from "react";
import { CheckIcon, Location, NotCheckIcon } from "../icons";
import Link from "next/link";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  width: "100%",
  position: "relative",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.divider}`,
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export const Introduction = ({ tour }) => {
  const [expanded, setExpanded] = useState("1");

  const formattedStartDate = new Date(tour.startDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const formattedEndDate = new Date(tour.endDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1536px] w-full flex gap-5">
        <div className="max-w-[1048px] flex flex-col gap-5">
          <div className="w-full flex flex-col gap-6 shadow-[-4px_-5px_14px_rgb(0,0,0,8%),5px_8px_16px_rgb(0,0,0,8%)] bg-white p-5 rounded-2xl">
            <div className="flex flex-col gap-2">
              <div className="flex">
                <div className="pb-3 border-b border-[#F97316]">
                  <p className="text-black font-roboto text-2xl font-semibold leading-6">
                    Overview
                  </p>
                </div>
              </div>
            </div>
            <p className="text-black font-roboto text-lg font-normal ">
              {tour.description}
            </p>
          </div>
          <div className="max-w-[1048px] w-full flex flex-col gap-8 shadow-[-4px_-5px_14px_rgb(0,0,0,8%),5px_8px_16px_rgb(0,0,0,8%)] bg-white p-5 rounded-2xl">
            <div className="flex flex-col gap-2">
              <div className="flex">
                <div className="pb-3 border-b border-[#F97316]">
                  <p className="text-black font-roboto text-2xl font-semibold leading-6">
                    Itinerary
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 ">
              <div className="w-[2px] relative h-full bg-[#F97316]">
                <div className="absolute left-[50%] translate-x-[-50%] top-[-20px]">
                  <Location />
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full">
                {tour.dailyPlans?.map((value, id) => {
                  return (
                    <Accordion
                      key={id}
                      expanded={expanded === value.day}
                      onChange={handleChange(value.day)}
                    >
                      <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                      >
                        <div className="flex items-center gap-5">
                          <p className="text-black font-sans text-lg font-normal">
                            Day {value.day}
                          </p>
                          <div className="h-full w-[1px] bg-[#242424]"></div>
                          <p className="text-black font-sans text-lg font-normal">
                            {value.dayTitle}
                          </p>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p className="text-black font-roboto text-lg font-medium leading-6">
                          Period of time
                        </p>
                        {Array.isArray(value.periodOfTime)
                          ? value.periodOfTime.map((activity, index) => (
                              <div
                                className="flex flex-col items-start"
                                key={index}
                              >
                                <div className="flex gap-2">
                                  <p className="font-roboto text-black">
                                    {activity.when} : {activity.notes}
                                  </p>
                                </div>
                              </div>
                            ))
                          : ""}
                        <p className="text-black font-roboto text-lg font-medium leading-6">
                          Activities
                        </p>
                        {Array.isArray(value.activities)
                          ? value.activities.map((activity, index) => (
                              <div className="flex flex-col" key={index}>
                                <div className="flex items-center gap-2">
                                  <div className="w-[6px] h-[6px] bg-[#F97316] rounded-full"></div>
                                  <p className="font-roboto text-black">
                                    {activity.activityName}
                                  </p>
                                </div>
                                <p className="px-[14px] font-roboto">
                                  {activity.notes}
                                </p>
                              </div>
                            ))
                          : ""}
                        <p className="text-black font-roboto text-lg font-medium leading-6">
                          Accommodation
                        </p>
                        {Array.isArray(value.accommodation)
                          ? value.accommodation.map((activity, index) => (
                              <div className="flex flex-col" key={index}>
                                <div className="flex items-center gap-2">
                                  <div className="w-[6px] h-[6px] bg-[#F97316] rounded-full"></div>
                                  <p className="font-roboto text-black">
                                    {activity.accomName}
                                  </p>
                                </div>
                                <p className="px-[14px] font-roboto">
                                  {activity.notes}
                                </p>
                              </div>
                            ))
                          : ""}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="shadow-[-4px_-5px_14px_rgb(0,0,0,8%),5px_8px_16px_rgb(0,0,0,8%)] bg-white p-5 rounded-2xl flex">
            <div className="w-full">
              <div className="flex">
                <div className="flex gap-6 flex-col w-full">
                  <div className="w-full flex">
                    <div className="pb-3 border-b border-[#F97316]">
                      <p className="text-black font-roboto  text-2xl font-semibold leading-6">
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
                          <p className="text-black font-sans text-lg font-normal">
                            {value}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-6 flex-col w-full">
                  <div className="w-full flex">
                    <div className="pb-3 border-b border-[#F97316]">
                      <p className="text-black font-roboto  text-2xl font-semibold leading-6">
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
                          <p className="text-black font-sans text-lg font-normal ">
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
          <div className="h-[500px] shadow-[-4px_-5px_14px_rgb(0,0,0,8%),5px_8px_16px_rgb(0,0,0,8%)] bg-white p-5 rounded-2xl flex">
            <div className="flex flex-col gap-2">
              <div className="flex">
                <div className="pb-3 border-b border-[#F97316]">
                  <p className="text-black font-roboto text-2xl font-semibold leading-6">
                    Tour map
                  </p>
                </div>
              </div>
            </div>
            {/* <div>
              <img src="" alt="" />
            </div> */}
          </div>
        </div>
        <div className="w-full max-w-[468px] flex flex-col gap-5">
          <div className="shadow-[-4px_-5px_14px_rgb(0,0,0,8%),5px_8px_16px_rgb(0,0,0,8%)] bg-white p-5 rounded-2xl flex flex-col gap-6">
            <div className="flex">
              <div className="pb-3 border-b border-[#F97316]">
                <p className="text-black font-roboto text-2xl font-semibold leading-6">
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
          <div className="shadow-[-4px_-5px_14px_rgb(0,0,0,8%),5px_8px_16px_rgb(0,0,0,8%)] bg-white p-5 rounded-2xl flex flex-col gap-6">
            <div className="flex">
              <div className="pb-3 border-b border-[#F97316]">
                <p className="text-black font-roboto text-2xl font-semibold leading-6">
                  Tour schedule
                </p>
              </div>
            </div>
            <div className="border-b border-[rgba(0,0,0,0.125)] pb-2 flex items-center gap-1">
              <p className="text-black font-roboto text-base font-normal">
                {formattedStartDate}
              </p>
              <p className="text-black font-roboto text-base font-normal">-</p>
              <p className="text-black font-roboto text-base font-normal">
                {formattedEndDate}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/book-now" className="w-full">
                <button className="w-full h-12 bg-[#F97316] rounded-lg text-white font-roboto text-xl font-medium">
                  Book now
                </button>
              </Link>
              <button className="w-full h-12 border border-[#F97316] rounded-lg text-[#F97316] font-roboto text-xl font-medium">
                Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
