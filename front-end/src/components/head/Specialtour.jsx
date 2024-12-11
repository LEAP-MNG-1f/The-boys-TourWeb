"use client";
import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { HeaderPart } from "../Homepage/components/Header";
import Country from "./Contry";

export default function Special() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    location: "",
    date: "",
    duration: "",
    groupSize: "",
    budget: "",
    contactName: "",
    email: "",
    phone: "",
    contactViaEmail: false,
    acceptPrivacy: false,
    receiveUpdates: false,
    travelingWithChildren: false,
    tailorExistingItinerary: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    setOpen(true);
  };

  return (
    <div className="flex justify-center">
      <HeaderPart />
      <div className="flex flex-col gap-10 pt-20 mt-20">
        <div className="flex flex-col justify-center w-[500px] h-[100px]">
          <label
            htmlFor="location"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Where would you like to go *
          </label>
          <div className="mt-3">
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="block min-w-0 grow py-1.5 pl-1 border border-gray-400 w-full rounded-lg pr-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 w-[500px] h-[100px]">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            When would you like to go
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="block w-full h-[34px] mt-2 rounded-md bg-white pl-3 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
          />
        </div>

        <div className="flex flex-col w-[500px] h-[100px]">
          <label
            htmlFor="duration"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            For how long (Minimum 5 nights) *
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="7 nights, or 2 weeks"
            className="block w-full mt-3 py-1.5 pl-1 pr-3 text-base border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm"
          />
        </div>

        <div className="flex flex-col mt-7">
          <label
            htmlFor="groupSize"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            How many traveling in your group? (Minimum 4 people) *
          </label>
          <input
            type="number"
            id="groupSize"
            name="groupSize"
            value={formData.groupSize}
            onChange={handleChange}
            min="1"
            className="block w-full py-1.5 px-3 text-base text-gray-900 rounded-md bg-white outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
          />
        </div>

        <div className="mt-5">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.travelingWithChildren}
                  onChange={handleChange}
                  name="travelingWithChildren"
                />
              }
              label="I am traveling with children under 18"
            />
          </FormGroup>
        </div>

        <div className="flex flex-col mt-7">
          <label
            htmlFor="budget"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            How much would you like to spend per person?
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            min="50"
            className="block w-full mt-3 py-1.5 px-3 text-base text-gray-900 rounded-md bg-white outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
          />
        </div>

        <div className="flex flex-col mt-7">
          <label
            htmlFor="contactName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name (as per passport)
          </label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            placeholder="First Name*"
            className="block w-full py-1.5 px-3 mt-5 text-base text-gray-900 rounded-md bg-white outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
          />
        </div>

        <div className="flex flex-col mt-10">
          <input
            type="text"
            id="contactLastName"
            name="contactLastName"
            value={formData.contactLastName}
            onChange={handleChange}
            placeholder="Last Name*"
            className="block w-full py-1.5 px-3 mt-5 text-base text-gray-900 rounded-md bg-white outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
          />
        </div>

        <div className="mt-10">
          <Country />
        </div>

        <form
          action="/submit-form"
          method="post"
          className="flex flex-col gap-2 mt-10"
        >
          <label htmlFor="email" className="text-gray-900">
            Email address*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            <label htmlFor="phone" className="text-gray-900">
              Phone Number*
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="123-45-678"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
              className="block w-full p-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </form>
        </div>

        <div>
          <h1 className="mt-10">I prefer to be contacted via*</h1>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.contactViaEmail}
                  onChange={handleChange}
                  name="contactViaEmail"
                />
              }
              label="Email"
            />
          </FormGroup>
        </div>

        <div className="mt-10 w-[500px]">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.acceptPrivacy}
                  onChange={handleChange}
                  name="acceptPrivacy"
                />
              }
              label="I accept that all details provided will be held and used in accordance with the Intrepid Travel Privacy Statement"
            />
          </FormGroup>
        </div>

        <div className="mt-10 w-[500px]">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.receiveUpdates}
                  onChange={handleChange}
                  name="receiveUpdates"
                />
              }
              label="We'd love to contact you by email from time to time about exciting travel news and products we think might interest you. Please tick this box if you are happy to receive this."
            />
          </FormGroup>
        </div>

        <Box sx={{ width: "100%" }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setOpen(false)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              It's successful
            </Alert>
          </Collapse>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!formData.acceptPrivacy}
          >
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
}
