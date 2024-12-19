"use client";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useState } from "react";
import { Location } from "../icons";
import TourMapCard from "./TourIncludeMap";
import { TourPrice } from "./TourPrice";
import { TourIternary } from "./TourIternary";
import { Overview } from "./Overview";

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

  const handleChange = (panel) => (newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1536px] w-full flex md:flex-row flex-col px-2 md:p-0 gap-2 md:gap-5">
        <div className="max-w-[1048px] w-full flex flex-col gap-2 md:gap-5">
          <Overview tour={tour} />
          <div className="max-w-[1048px] w-full flex flex-col gap-8 shadow-[-4px_-5px_14px_rgb(0,0,0,8%),5px_8px_16px_rgb(0,0,0,8%)] bg-white p-3 md:p-5 rounded-2xl">
            <TourIternary />
            <div className="flex gap-3 md:gap-5 ">
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
                        <div className="flex items-center gap-5 text-center">
                          <p className="text-black font-sans text-base md:text-lg font-normal min-w-[44px]">
                            Day {value.day}
                          </p>
                          <div className="h-full w-[1px] bg-[#242424]"></div>
                          <p className="text-black font-sans text-base md:text-lg font-normal">
                            {value.dayTitle}
                          </p>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p className="text-black font-roboto text-base md:text-lg font-medium leading-6">
                          Period of time
                        </p>
                        {Array.isArray(value.periodOfTime)
                          ? value.periodOfTime.map((activity, index) => (
                              <div
                                className="flex flex-col items-start"
                                key={index}
                              >
                                <div className="flex gap-2">
                                  <p className="font-roboto text-black text-sm md:text-base">
                                    {activity.when} : {activity.notes}
                                  </p>
                                </div>
                              </div>
                            ))
                          : ""}
                        <p className="text-black font-roboto text-base md:text-lg font-medium leading-6">
                          Activities
                        </p>
                        {Array.isArray(value.activities)
                          ? value.activities.map((activity, index) => (
                              <div className="flex flex-col" key={index}>
                                <div className="flex items-center gap-2">
                                  <div className="w-[6px] h-[6px] bg-[#F97316] rounded-full"></div>
                                  <p className="font-roboto text-black text-sm md:text-base">
                                    {activity.activityName}
                                  </p>
                                </div>
                                <p className="px-[14px] font-roboto text-sm md:text-base">
                                  {activity.notes}
                                </p>
                              </div>
                            ))
                          : ""}
                        <p className="text-black font-roboto text-base md:text-lg font-medium leading-6">
                          Accommodation
                        </p>
                        {Array.isArray(value.accommodation)
                          ? value.accommodation.map((activity, index) => (
                              <div className="flex flex-col" key={index}>
                                <div className="flex items-center gap-2">
                                  <div className="w-[6px] h-[6px] bg-[#F97316] rounded-full"></div>
                                  <p className="font-roboto text-black text-sm md:text-base">
                                    {activity.accomName}
                                  </p>
                                </div>
                                <p className="px-[14px] font-roboto text-sm md:text-base">
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
          <TourMapCard tour={tour} />
        </div>
        <TourPrice tour={tour} />
      </div>
    </div>
  );
};
