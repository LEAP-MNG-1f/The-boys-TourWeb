"use client";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { CheckIcon, Location, NotCheckIcon } from "../icons";
import { included, notIncluded, tour } from "./data";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
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

export const Introduction = () => {
  const [expanded, setExpanded] = useState("DAY-1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1536px] flex gap-5">
        <div className="flex flex-col gap-5">
          <div className="w-full flex flex-col gap-8 shadow-[-4px_-5px_14px_rgb(0,0,0,8%),5px_8px_16px_rgb(0,0,0,8%)] bg-white p-5 rounded-2xl">
            <div className="flex flex-col gap-2">
              <div className="flex">
                <div className="pb-3 border-b border-[#F97316]">
                  <p className="text-black font-roboto text-2xl font-semibold leading-6">
                    Itinerary
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-[3px] relative h-full bg-[#F97316]">
                <div className="absolute left-[50%] translate-x-[-50%] top-[-20px]">
                  <Location />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {tour?.map((value, id) => {
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
                          <Typography>{value.day}</Typography>
                          <div className="h-full w-[1px] bg-[#242424]"></div>
                          <Typography>{value.text}</Typography>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{value.description}</Typography>
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
                <div className="flex gap-4 flex-col w-full">
                  <div className="w-full flex">
                    <div className="pb-3 border-b border-[#F97316]">
                      <p className="text-black font-roboto  text-2xl font-semibold leading-6">
                        Service included
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    {included?.map((value, id) => {
                      return (
                        <div className="flex items-start gap-2" key={id}>
                          <div className="w-6 h-6 flex items-center justify-center">
                            <CheckIcon />
                          </div>
                          <p className="text-black font-sans text-lg font-normal ">
                            {value}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-4 flex-col w-full">
                  <div className="w-full flex">
                    <div className="pb-3 border-b border-[#F97316]">
                      <p className="text-black font-roboto  text-2xl font-semibold leading-6">
                        Service not included
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    {notIncluded?.map((value, id) => {
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
            <div></div>
          </div>
        </div>
        <div className="w-[600px] flex flex-col gap-5">
          <div className="shadow-[-4px_-5px_14px_rgb(0,0,0,8%),5px_8px_16px_rgb(0,0,0,8%)] bg-white p-5 rounded-2xl flex flex-col gap-4">
            <div className="flex">
              <div className="pb-3 border-b border-[#F97316]">
                <p className="text-black font-roboto text-2xl font-semibold leading-6">
                  Tour price
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.125)] pb-2">
                <p className="text-black font-roboto text-base font-medium">
                  2 pax
                </p>
                <p className="text-black font-roboto text-base font-medium">
                  1690$
                </p>
              </div>
              <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.125)] pb-2">
                <p className="text-black font-roboto text-base font-medium">
                  3 pax
                </p>
                <p className="text-black font-roboto text-base font-medium">
                  1390$
                </p>
              </div>
              <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.125)] pb-2">
                <p className="text-black font-roboto text-base font-medium">
                  4 pax
                </p>
                <p className="text-black font-roboto text-base font-medium">
                  1355$
                </p>
              </div>
            </div>
          </div>
          <div className="h-[300px] shadow-[-4px_-5px_14px_rgb(0,0,0,8%),5px_8px_16px_rgb(0,0,0,8%)] bg-white p-5 rounded-2xl flex flex-col gap-4">
            <div className="flex">
              <div className="pb-3 border-b border-[#F97316]">
                <p className="text-black font-roboto text-2xl font-semibold leading-6">
                  Tour schedule
                </p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
