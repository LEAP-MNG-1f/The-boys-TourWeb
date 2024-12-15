"use client";

import React, { useRef, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Alert,
  IconButton,
  Collapse,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { HeaderPart } from "../Homepage/components/Header";
import emailjs from "@emailjs/browser";
import { countries } from "./constants";

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

export default function Specialtour() {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_location: "",
    user_date: "",
    user_duration: "",
    user_groupSize: "",
    user_budget: "",
    user_name: "",
    user_email: "",
    user_phone: "",
    message: "",
    selectedCountry: "",
    user_tailorExistingItinerary: false,
    user_contactViaEmail: false,
    user_acceptPrivacy: false,
    user_receiveUpdates: false,
    user_travelingWithChildren: false,
  });
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "selectedCountries") {
      const selectedValues = event.target.value;
      setSelectedCountries(selectedValues);
    }
  };

  const getStyles = (country, selectedCountry) => {
    return {
      fontWeight: selectedCountry === country ? 600 : 400,
    };
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_jlg3mrb", "template_catf42r", form.current, {
        publicKey: "7QzFdmcdwTabvK-Fg",
      })
      .then(
        () => {
          setOpen(true);
        },
        (error) => {}
      );
  };

  return (
    <div className="flex flex-col">
      <HeaderPart />
      <div className="w-full flex flex-col items-center gap-20 mt-[144px]">
        <form
          ref={form}
          onSubmit={sendEmail}
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
                  Where would you like to go?
                </p>
                <input
                  type="text"
                  id="user_location"
                  name="user_location"
                  value={formData.user_location}
                  onChange={handleChange}
                  className="h-12 px-4 py-2 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-black text-base font-roboto font-normal">
                  When would you like to go?
                </p>
                <input
                  type="date"
                  id="user_date"
                  name="user_date"
                  value={formData.date}
                  onChange={handleChange}
                  className="h-12 px-4 py-2 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-black text-base font-roboto font-normal">
                  For how long (Minimum 5 nights) *
                </p>
                <input
                  type="text"
                  id="user_duration"
                  name="user_duration"
                  value={formData.user_duration}
                  onChange={handleChange}
                  placeholder="7 nights, or 2 weeks"
                  className="h-12 px-4 py-2 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-black text-base font-roboto font-normal">
                  How many traveling in your group? (Minimum 4 people) *
                </p>
                <input
                  type="number"
                  id="user_groupSize"
                  name="user_groupSize"
                  value={formData.user_groupSize}
                  onChange={handleChange}
                  min="1"
                  className="h-12 px-4 py-2 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none"
                  required
                />
              </div>
              <p className="text-black text-base font-roboto font-normal">
                Our Tailor_made trips are customised private departures
                Centerally, unless you have 6 or more people in your group
                idestination depentaly, price will be higher than our standard
                tours but the experience is will worth it
              </p>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.user_travelingWithChildren}
                      onChange={handleChange}
                      name="user_travelingWithChildren"
                    />
                  }
                  label="I am traveling with children under 18"
                />
              </FormGroup>
              <div className="flex flex-col gap-2">
                <p className="text-black text-base font-roboto font-normal">
                  How much would you like to spend per person?
                </p>
                <input
                  type="user_number"
                  id="user_budget"
                  name="user_budget"
                  min="50"
                  className="h-12 px-4 py-2 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-black text-base font-roboto font-normal">
                  Tell us about your travel plans
                </p>
                {/* <p className="text-black text-base font-roboto font-normal">
                    intrepid Tailor-Made trips include an elment of touring if
                    you are looking for just a hotel and transfer or an
                    all-inclusive resort package, then we recommend reching out
                    to a local travel agent, if you are looking to get to know
                    the destination, meeting locals, and maybe try new food- we
                    got you covered*
                  </p> */}
                <textarea
                  name="message"
                  rows={2}
                  cols={20}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any must-haves in your ideal itinerary, your preferred style of accommodation, any special interests of your group..."
                  className="px-4 py-3 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none resize-none"
                  style={{ height: "93px" }}
                ></textarea>
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
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.user_tailorExistingItinerary}
                      onChange={handleChange}
                      name="user_tailorExistingItinerary"
                    />
                  }
                  label="I would like to tailor an existing itinerary"
                />
              </FormGroup>
              <p className="text-black text-base font-roboto font-normal">
                if you have seen a trip you love the look of on our website,
                please let us know the name or website link, Aternatively if you
                have your own itinerary feel to upload this your conutant can
                work with you and your group on a proposel,
              </p>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="user_name"
                  className="text-black text-base font-roboto font-normal"
                >
                  Name (as per passport)
                </label>
                <input
                  type="user_name"
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="First Name*"
                  className="cursor-pointer h-12 px-4 py-2 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="lai"
                  id="lai"
                  name="lai"
                  value={formData.user_lai}
                  onChange={handleChange}
                  placeholder="Last Name*"
                  className="cursor-pointer h-12 px-4 py-2 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-black text-base font-roboto font-normal">
                  Where are you from
                </p>
                <Select
                  value={formData.selectedCountry || ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setFormData({
                      ...formData,
                      selectedCountry: value,
                    });
                  }}
                  input={<OutlinedInput />}
                  MenuProps={MenuProps}
                  name="selectedCountry"
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
                  {countries.map((country) => (
                    <MenuItem
                      key={country}
                      value={country}
                      style={getStyles(country, formData.selectedCountry)}
                    >
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-black text-base font-roboto font-normal">
                  Email Address
                </p>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="h-12 px-4 py-2 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-black text-base font-roboto font-normal">
                  Phone number
                </p>
                <input
                  type="phone"
                  id="user_phone"
                  name="user_phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone*"
                  className="h-12 px-4 py-2 rounded-[4px] border border-[#ECEDF0] bg-[#F7F7F8] text-black font-sans text-base font-normal leading-5 outline-none"
                  required
                />
              </div>
              <div className="mt-10 w-full">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.user_contactViaEmail}
                        onChange={handleChange}
                        name="user_contactViaEmail"
                      />
                    }
                    label="Email"
                  />
                </FormGroup>
              </div>
              <div className="mt-10 w-full">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.user_acceptPrivacy}
                        onChange={handleChange}
                        name="user_acceptPrivacy"
                      />
                    }
                    label="I accept that all details provided will be held and used in accordance with the intrepid Travel Privacy Statement"
                  />
                </FormGroup>
              </div>
              <div className="mt-10 w-full">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.user_receiveUpdates}
                        onChange={handleChange}
                        name="user_receiveUpdates"
                      />
                    }
                    label="We'd love to contact you by email from time to time  about exciting travel news and products we think might interest you. Please tick this box if you are hapy to receive this"
                  />
                </FormGroup>
              </div>

              <Box sx={{ width: "100%" }}>
                <h1 className="mt-10">
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
                      Form submitted successfully!
                    </Alert>
                  </Collapse>
                </h1>
                <div className="flex gap-4">
                  <div className="w-full h-12"></div>
                  <Button
                    variant="contained"
                    className="w-full h-12 bg-[#F97316] rounded-lg text-white font-roboto text-xl font-medium"
                    type="submit"
                    disabled={!formData.user_acceptPrivacy}
                  >
                    Subimt
                  </Button>
                </div>
              </Box>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
