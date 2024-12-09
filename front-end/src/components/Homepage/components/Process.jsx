import React from "react";
import { ClickIcon } from "../icons/Click";

const WorkingProcess = () => {
  const steps = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-[150px]">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Working Process
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="text-center flex flex-col items-center relative"
          >
            <div className="flex justify-between items-center w-full mb-6 px-[50px] mt-[20px]">
              <ClickIcon />

              <span className="text-7xl font-bold text-gray-200">
                {`0${index + 1}`}
              </span>
            </div>

            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              {step.title}
            </h4>

            <p className="text-gray-600  px-4">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkingProcess;
