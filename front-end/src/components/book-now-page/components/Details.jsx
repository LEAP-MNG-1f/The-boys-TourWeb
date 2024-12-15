"use client";

import { Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Minus } from "../icons/Minus";
import { Plus } from "../icons/Plus";
import { useFormik } from "formik";
import { countries } from "@/components/head/constants";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const Details = ({
  tour,
  incrementQuantity,
  decrementQuantity,
  calculateTotalAmount,
  price,
}) => {
  const getStyles = (country, selectedCountry) => {
    return {
      fontWeight: selectedCountry === country ? 600 : 400,
    };
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      country: "",
      startdate: "",
      enddate: "",
      personNumber: "",
      questions: "",
      totalamount: "",
      tourId: "",
    },

    // validationSchema,
    onSubmit: async (values) => {
      const totalAmount = calculateTotalAmount();
      const requestData = {
        ...values,
        totalamount: totalAmount,
      };
      try {
        const response = await fetch(`http://localhost:8000/api/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        const data = await response.json();

        console.log(data);

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (tour._id) {
      formik.setFieldValue("tourId", tour._id);
    }
  }, [tour._id]);

  return (
    <div className="w-full flex flex-col items-center gap-20 mt-[144px]">
      <div className="max-w-[1080px] w-full h-[3px] bg-[#F97316]"></div>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[1080px] w-full flex gap-20"
      >
        <div className="w-full bg-white p-6 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.05)]">
          <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex">
                <div className="pb-3 border-b border-[#F97316]">
                  <p className="text-black font-roboto text-2xl font-semibold leading-6">
                    Personal information
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black text-base font-roboto font-normal">
                Full name
              </p>
              <input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Full name"
                className="h-12 px-4 py-2 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none"
                value={formik.values.fullname}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black text-base font-roboto font-normal">
                Email
              </p>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                className="h-12 px-4 py-2 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black text-base font-roboto font-normal">
                Phone
              </p>
              <input
                id="phone"
                name="phone"
                type="number"
                placeholder="Phone number"
                className="h-12 px-4 py-2 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black text-base font-roboto font-normal">
                Country
              </p>
              <Select
                id="country"
                name="country"
                value={formik.values.country}
                onChange={(event) => {
                  formik.setFieldValue("country", event.target.value);
                }}
                MenuProps={MenuProps}
                sx={{
                  height: "48px",
                  border: "1px solid #ECEDF0",
                  backgroundColor: "#F7F7F8",
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                required
              >
                {countries.map((country, id) => (
                  <MenuItem
                    key={id}
                    value={country}
                    style={getStyles(country, formik.values.country)}
                  >
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black text-base font-roboto font-normal">
                Questions or comments you may tell us?
              </p>
              <textarea
                id="questions"
                name="questions"
                type="text"
                placeholder="Questions or comments"
                className="h-[200px] px-4 py-3 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none resize-none"
                value={formik.values.questions}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full bg-white p-6 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.05)]">
          <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex">
                <div className="pb-3 border-b border-[#F97316]">
                  <p className="text-black font-roboto text-2xl font-semibold leading-6">
                    Booking information
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black text-base font-roboto font-normal">
                Start date
              </p>
              <input
                id="startdate"
                name="startdate"
                type="date"
                className="cursor-pointer h-12 px-4 py-2 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none"
                value={formik.values.startdate}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black text-base font-roboto font-normal">
                End date
              </p>
              <input
                id="enddate"
                name="enddate"
                type="date"
                className="cursor-pointer h-12 px-4 py-2 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none"
                value={formik.values.enddate}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black text-base font-roboto font-normal">
                Person number
              </p>
              <input
                id="personNumber"
                name="personNumber"
                type="number"
                placeholder="Person number"
                className="h-12 px-4 py-2 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none"
                value={formik.values.personNumber}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <div className="pb-3 border-b border-[#F97316]">
                  <p className="text-black font-roboto text-2xl font-semibold leading-6">
                    Your selected tour: {tour.title}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {price?.map((item, id) => {
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between border-b border-[rgba(0,0,0,0.125)] pb-2"
                  >
                    <p className="text-black text-base font-roboto font-normal">
                      {item.pax} pax
                    </p>
                    <div className="flex items-center gap-4">
                      <p className="text-black text-base font-roboto font-normal">
                        {item.perPerson}$
                      </p>
                      <button
                        type="button"
                        onClick={() => decrementQuantity(item._id)}
                        className="w-9 h-8 flex items-center justify-center rounded-lg bg-white border border-black"
                      >
                        <Minus />
                      </button>
                      <p className="text-black text-base font-roboto font-normal">
                        {item.quantity}
                      </p>
                      <button
                        type="button"
                        onClick={() => incrementQuantity(item._id)}
                        className="w-9 h-8 flex items-center justify-center rounded-lg bg-white border border-black"
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-black text-base font-roboto font-medium">
                Total amount:
              </p>
              <p className="text-black text-base font-roboto font-medium">
                ${calculateTotalAmount().toFixed(2)}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                className="w-full h-12 bg-white rounded-lg text-[#F97316] font-roboto text-xl font-medium border border-[#F97316]"
                onClick={() => formik.resetForm()}
              >
                Clear
              </button>
              <button
                type="submit"
                className="w-full h-12 bg-[#F97316] rounded-lg text-white font-roboto text-xl font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
