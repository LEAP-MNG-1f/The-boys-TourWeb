"use client";
import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Country from "./Contry";

export default function Special() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-  pt-20">
        <div className="flex flex-col justify-center w-[500px] h-[100px]">
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Where would you like to go *
          </label>
          <div className="mt-3">
            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
              <input className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm w-[358px] h-[34px]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-[500px] h-[100px]">
          <form action="/action_page.php">
            <label
              htmlFor="birthday"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              When would you like to go
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              className="block w-full h-[34px] mt-2 rounded-md bg-white pl-3 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
            />
          </form>
        </div>
        <div className="flex flex-col w-[500px] h-[100px]">
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            For how long (Minimum 5 nights) *
          </label>
          <div className="mt-3">
            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
              <input
                placeholder="7 nigths, or 2 weeks"
                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm w-[358px] h-[34px]"
              />
            </div>
          </div>
        </div>
        <h1 className="font-bold text-[22px] mt-5">
          Your group and travel plans
        </h1>
        <div className="flex flex-col mt-7">
          <label
            htmlFor="duration"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            How many travelling in your group ? (Minimum 4 people) *
          </label>
          <div className="mt-3">
            <input
              type="number"
              id="duration"
              name="duration"
              min="1"
              className="block w-full py-1.5 px-3 text-base text-gray-900 rounded-md bg-white outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
            />
          </div>
        </div>
        <div className="mt-5">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="i am traveling with children under 18"
            />
          </FormGroup>
        </div>
        <h1 className="font-bold text-[22px] mt-10">
          How much would you like to spend per person?
        </h1>
        <h1 className="w-[500px] mt-10">
          Our Taler-made trips are custorrised private departurss Cenerally,
          unknow you have 6 or more people in your group destination dependant
          price will be higher than our standard tours but the exprerince is
          well worth it
        </h1>
        <div className="mt-3">
          <input
            type="number"
            id="duration"
            name="duration"
            min="50"
            className="block w-full  mt-5 py-1.5 px-3 text-base text-gray-900 rounded-md bg-white outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
          />
        </div>
        <h1 className="font-bold text-[22px] mt-10">
          Tell us about your travel plans
        </h1>
        <h1 className="w-[500px] mt-8">
          intrepid Tallor-Made trips include an element of touring if you are
          looking for just a hotel and transfer or an all-inclusive resort
          package if you are looking to get know the destination, meeting
          locals, and maybe try new food - we got you covered
        </h1>
        <div>
          <textarea
            name="dnn$ctr200131$View$Comments"
            rows={2}
            cols={20}
            id="dnn_ctr200131_View_Comments"
            placeholder="Any must haves in your idel ltinerary your prefened style of accommodain, ny special interests of your group "
            className="form-control mt-5 CommentsTextBox border border-e-gray-600 w-full"
            style={{ height: "93px" }}
          ></textarea>
        </div>

        <div className="mt-5">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="i would like to tailor an existing itinerary"
            />
          </FormGroup>
        </div>
        <h1 className="w-[500px] mt-10">
          if you have seen a trip you love the look of on our website please let
          us know the name or website link. Aternatively if to you have your own
          itinerary feel free to upload this your contact can work with you and
          your group an a proposal
        </h1>
        <h1 className="font-bold text-[22px] mt-10">Your contact details</h1>
        <h1 className=" mt-5">Name (as per passport)</h1>

        <div className="mt-5">
          <input
            placeholder="Frist Name*"
            className="block w-full py-1.5 px-3 mt-5 text-base text-gray-900 rounded-md bg-white outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
          />
        </div>
        <div className="mt-10">
          <input
            placeholder="Last Name*"
            className="block w-full py-1.5 px-3 mt-5s text-base text-gray-900 rounded-md bg-white outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
          />
        </div>
        <div className="mt-10">
          <Country />
        </div>
        <form
          action="/submit-form"
          method="post"
          className="flex flex-col gap-2"
        >
          <label htmlFor="email" className=" text-gray-900 mt-10">
            Enter address*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="block w-full p-2 border rounded-md text-gray-900 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </form>
        <div className="mt-8">
          <form
            action="/action_page"
            method="post"
            className="flex flex-col gap-3"
          >
            <label htmlFor="phone" className=" text-gray-900">
              Phone Number*
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="123-45-678"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
              className="block w-full p-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </form>
        </div>
        <div>
          <h1 className="mt-10">I prefer to be contact via*</h1>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Email"
            />
          </FormGroup>
        </div>
        <div className="mt-10 w-[500px]">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="I accept that all deteils provided will be held and used in accordance with the intrepid Travel Privacy Statement"
            />
          </FormGroup>
        </div>
        <div className="mt-10  w-[500px]">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="We'd love to contact you by email from time t time about exciting travel news and products we think migth interest you. Please tick this box if you are happy to receive this"
            />
          </FormGroup>
        </div>
        <div>
          <button
            type="submit"
            className="mt-10 w-[100px] p-2 bg-black text-white rounded-md hover:bg-gray-800  "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
