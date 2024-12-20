"use client";

import { countries } from "@/components/head/constants";
import { Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Minus } from "../icons/Minus";
import { Plus } from "../icons/Plus";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CircularProgress } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { BACKEND_URL } from "@/constant";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

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
  const [isFilled, setIsFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const getStyles = (country, selectedCountry) => {
    return {
      fontWeight: selectedCountry === country ? 600 : 400,
    };
  };

  const validationSchema = Yup.object({
    fullname: Yup.string()
      .required("Full name is required")
      .min(3, "Must be at least 3 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{9,15}$/, "Must be a valid phone number"),
    country: Yup.string().required("Country is required"),
    startdate: Yup.date()
      .required("Start date is required")
      .min(new Date(), "Start date must be tomorrow or later"),
    enddate: Yup.date()
      .required("End date is required")
      .min(new Date(), "End date must be tomorrow or later"),
    personNumber: Yup.number()
      .required("Number of persons is required")
      .min(1, "Must be at least 1 person"),
    totalamount: Yup.number().required("Total amount is required"),
  });

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
      totalamount: 0,
      tourId: tour?._id || "",
    },

    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      if (formik.isValid) {
        // Form data is valid, continue with payment
        const totalAmount = calculateTotalAmount();
        const requestData = {
          ...values,
          totalamount: totalAmount,
        };
        try {
          const response = await fetch(`${BACKEND_URL}/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          });
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

          const stripe = await stripePromise;
          const res = await fetch("/api/stripe", {
            method: "POST",
            body: JSON.stringify({
              amount: totalAmount,
              title: tour.title,
              images: tour.images,
            }),
            headers: { "Content-Type": "application/json" },
          });
          const { sessionId } = await res.json();
          await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
          console.error("Error processing payment:", error);
        } finally {
          setLoading(false); // Reset loading state after submission
        }
      } else {
        console.error("Validation failed. Fix errors before submission.");
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (tour._id) {
      formik.setFieldValue("tourId", tour._id);
    }
  }, [tour._id]);

  useEffect(() => {
    const totalAmount = calculateTotalAmount();
    formik.setFieldValue("totalamount", totalAmount);

    const isAllFieldsFilled =
      formik.values.fullname &&
      formik.values.email &&
      formik.values.phone &&
      formik.values.country &&
      formik.values.startdate &&
      formik.values.enddate &&
      formik.values.personNumber > 0 &&
      totalAmount > 0;

    setIsFilled(isAllFieldsFilled);
  }, [formik.values, calculateTotalAmount]);

  return (
    <div className="w-full flex flex-col items-center gap-20 md:gap-[100px] mt-[124px] md:mt-[144px]">
      <div className="relative max-w-[1080px] w-full">
        <div className="flex items-center justify-center">
          <div className="relative w-[33.33%] flex justify-center">
            <div className="w-12 h-12 bg-[#F97316] rounded-full"></div>
            <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 font-roboto text-white text-2xl md:text-3xl font-semibold">
              1
            </p>
            <p className="absolute top-[110%] left-[50%] translate-x-[-50%] text-black font-roboto text-lg font-medium">
              INFORMATION
            </p>
          </div>
          <div className="relative w-[33.33%] flex justify-center">
            <div className="w-12 h-12 bg-[#F97316] rounded-full"></div>
            <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 font-roboto text-white text-2xl md:text-3xl font-semibold">
              2
            </p>
            <p className="absolute top-[110%] left-[50%] translate-x-[-50%] text-black font-roboto text-lg font-medium">
              PAYMENT
            </p>
          </div>
          <div className="relative w-[33.33%] flex justify-center">
            <div className="w-12 h-12 bg-[#F97316] rounded-full"></div>
            <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 font-roboto text-white text-2xl md:text-3xl font-semibold">
              3
            </p>
            <p className="absolute top-[110%] left-[50%] translate-x-[-50%] text-black font-roboto text-lg font-medium">
              FINISH
            </p>
          </div>
          <div className="absolute w-full h-[3px] bg-[#F97316]"></div>
        </div>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[1080px] w-full flex md:flex-row flex-col gap-2 md:gap-20 px-2 "
      >
        <div className="w-full bg-white p-4 md:p-6 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.05)]">
          <div className="w-full flex flex-col gap-3 md:gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex">
                <div className="pb-1 md:pb-3 border-b border-[#F97316]">
                  <p className="text-black font-roboto text-2xl font-semibold leading-6">
                    Personal information
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
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
              {formik.touched.fullname && formik.errors.fullname ? (
                <p className="text-red-600 text-sm">{formik.errors.fullname}</p>
              ) : null}
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
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-600 text-sm">{formik.errors.email}</p>
              ) : null}
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
              {formik.touched.phone && formik.errors.phone ? (
                <p className="text-red-600 text-sm">{formik.errors.phone}</p>
              ) : null}
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
              {formik.touched.country && formik.errors.country ? (
                <p className="text-red-600 text-sm">{formik.errors.country}</p>
              ) : null}
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
                className="h-[100px] md:h-[200px] px-4 py-3 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none resize-none"
                value={formik.values.questions}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full bg-white p-4 md:p-6 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.05)]">
          <div className="w-full flex flex-col gap-3 md:gap-6">
            <div className="flex flex-col gap-1 md:gap-2">
              <div className="flex">
                <div className="pb-1 md:pb-3 border-b border-[#F97316]">
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
              {formik.touched.startdate && formik.errors.startdate ? (
                <p className="text-red-600 text-sm">
                  {formik.errors.startdate}
                </p>
              ) : null}
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
              {formik.touched.enddate && formik.errors.enddate ? (
                <p className="text-red-600 text-sm">{formik.errors.enddate}</p>
              ) : null}
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
              {formik.touched.personNumber && formik.errors.personNumber ? (
                <p className="text-red-600 text-sm">
                  {formik.errors.personNumber}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <div className="pb-1 md:pb-3 border-b border-[#F97316]">
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
                className="w-full h-12 bg-white rounded-lg text-[#F97316] hover:text-orange-600 hover:border-orange-600 transition-all duration-300 font-roboto text-xl font-medium border border-[#F97316]"
                onClick={() => formik.resetForm()}
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={!isFilled}
                className={`w-full h-12 rounded-lg font-roboto text-xl font-medium transition-all duration-300 ${
                  isFilled
                    ? "bg-[#F97316] text-white hover:bg-orange-600"
                    : "bg-[#EEEFF2] text-[rgba(28,32,36,0.24)]"
                }`}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
