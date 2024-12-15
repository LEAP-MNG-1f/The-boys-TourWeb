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
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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
    <div className="flex justify-center">
      <HeaderPart />
      <div className="flex gap-10 pt-10 mt-10">
        <form ref={form} onSubmit={sendEmail}>
          <div className="flex gap-20">
            <div>
              <div className="flex flex-col justify-center w-[500px] h-[100px]">
                <h1> Where would you like to go *</h1>
                <input
                  type="text"
                  id="user_location"
                  name="user_location"
                  value={formData.user_location}
                  onChange={handleChange}
                  className="block w-full py-1.5 pl-1 border border-gray-400 rounded-lg pr-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm"
                  required
                />
              </div>
              <div className="flex flex-col gap-3 w-[500px] h-[100px]">
                <h1> When would you like to go</h1>
                <input
                  type="date"
                  id="user_date"
                  name="user_date"
                  value={formData.date}
                  onChange={handleChange}
                  className="block w-full h-[34px] mt-2 rounded-md bg-white pl-3 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  required
                />
              </div>
              <div className="flex flex-col w-[500px] h-[100px]">
                <h1> For how long (Minimum 5 nights) *</h1>
                <input
                  type="text"
                  id="user_duration"
                  name="user_duration"
                  value={formData.user_duration}
                  onChange={handleChange}
                  placeholder="7 nights, or 2 weeks"
                  className="block w-full mt-3 py-1.5 pl-1 pr-3 text-base border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm"
                  required
                />
              </div>
              <div className="flex flex-col mt-7">
                <h1 className="font-bold text-[22px]">
                  Your group and travel plans
                </h1>
                <h1>How many traveling in your group? (Minimum 4 people) *</h1>

                <input
                  type="number"
                  id="user_groupSize"
                  name="user_groupSize"
                  value={formData.user_groupSize}
                  onChange={handleChange}
                  min="1"
                  className="block w-full py-1.5 mt-5 px-3 text-base text-gray-900 rounded-md bg-white outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  required
                />
              </div>
              <h1 className="w-[500px] mt-5">
                Our Tailor_made trips are customised private departures
                Centerally, unless you have 6 or more people in your group
                idestination depentaly, price will be higher than our standard
                tours but the experience is will worth it
              </h1>
              <div className="mt-5">
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
              </div>
              <div className="flex flex-col mt-7">
                <h1 className="font-bold text-[22px] mt-10">
                  How much would you like to spend per person?
                </h1>
                <div className="mt-3">
                  <input
                    type="user_number"
                    id="user_budget"
                    name="user_budget"
                    min="50"
                    className="block w-full mt-5 py-1.5 px-3 text-base text-gray-900 rounded-md bg-white outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  />
                </div>
                <h1 className="font-bold text-[22px] mt-10">
                  Tell us about your travel plans
                </h1>
                <h1 className="w-[500px] mt-5">
                  intrepid Tailor-Made trips include an elment of touring if you
                  are looking for just a hotel and transfer or an all-inclusive
                  resort package, then we recommend reching out to a local
                  travel agent, if you are looking to get to know the
                  destination, meeting locals, and maybe try new food- we got
                  you covered*
                </h1>
                <textarea
                  name="message"
                  rows={2}
                  cols={20}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any must-haves in your ideal itinerary, your preferred style of accommodation, any special interests of your group..."
                  className="form-control mt-5 border border-gray-600 w-full"
                  style={{ height: "93px" }}
                ></textarea>
              </div>
            </div>
            <div>
              <div className="mt-5">
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
              </div>
              <h1 className="w-[500px] mt-5">
                if you have seen a trip you love the look of on our website,
                please let us know the name or website link, Aternatively if you
                have your own itinerary feel to upload this your conutant can
                work with you and your group on a proposel,
              </h1>
              <div className="flex flex-col mt-7">
                <h1 className="font-bold text-[22px] mt-10">
                  Your contact details
                </h1>
                <label
                  htmlFor="user_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
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
                  className="block w-full py-1.5 px-3 mt-5 text-base text-gray-900 rounded-md bg-white outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  required
                />
              </div>
              <div>
                <input
                  type="lai"
                  id="lai"
                  name="lai"
                  value={formData.user_lai}
                  onChange={handleChange}
                  placeholder="Last Name*"
                  className="block w-full py-1.5 px-3 mt-5 text-base text-gray-900 rounded-md bg-white outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  required
                />
              </div>
              <div className="mt-5">
                <h1>Where are you from</h1>
                <div className="mt-5">
                  <div>
                    <div className="flex flex-col w-[500px] h-[100px] gap-3">
                      <h1>Which countries would you like to visit *</h1>
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
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-5">
                <h1> Email Address</h1>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="block w-full py-1.5 px-3 mt-1 text-base text-gray-900 rounded-md bg-white outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  required
                />
              </div>
              <div className="flex flex-col mt-5">
                <input
                  type="phone"
                  id="user_phone"
                  name="user_phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone*"
                  className="block w-full py-1.5 px-3 mt-5 text-base text-gray-900 rounded-md bg-white outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  required
                />
              </div>
              <div className="mt-10 w-[500px]">
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
              <div className="mt-10 w-[500px]">
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
              <div className="mt-10 w-[500px]">
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
                <div className="mt-5">
                  <Button
                    variant="contained"
                    color="primary"
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
