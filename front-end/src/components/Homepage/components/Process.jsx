import React from "react";
import { ClickIcon } from "../icons/Click";
import {
  BookOpenIcon,
  UsersIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const WorkingProcess = () => {
  const steps = [
    {
      id: 1,
      icon: BookOpenIcon,
      title: "Responsible and Secure Tourism",
      description:
        "We prioritize sustainable practices and safety, ensuring that our tours leave a positive impact on the environment and local communities.",
    },
    {
      id: 2,
      icon: UsersIcon,
      title: "A Professional Team You Can Trust",
      description:
        "Our team is skilled, passionate, and committed to delivering exceptional customer service at every step of your journey.",
    },
    {
      id: 3,
      icon: HeartIcon,
      title: "Honesty and Value-Driven Culture",
      description:
        "We are a company built on integrity, prioritizing the well-being of our customers, employees, and partners, while upholding values that create meaningful and lasting relationships.",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-[50px] rounded-[15px]  shadow-xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Working <span className="text-orange-500">Process</span>
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
            <div className="flex items-center">
              <step.icon className="h-8 w-8 text-black mx-auto mb-4 max-sm:hidden" />
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                {step.title}
              </h4>
            </div>

            <p className="text-gray-600  px-4">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkingProcess;
