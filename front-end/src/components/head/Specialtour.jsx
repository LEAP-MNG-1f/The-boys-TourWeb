"use client";
import React, { useRef, useState } from "react";
import {
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
    <div className="flex flex-col items-center justify-center px-4 sm:px-0 sm:pr-5">
      <HeaderPart />
      <div className="flex flex-col pt-10 mt-10 justify-center w-full md:w-1/2">
        <h2 className="text-4xl font-bold mb-4">
          Plan <span className="text-orange-500">Your Trip</span>
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Design your dream adventure in Mongolia! Our customizable tour
          planning lets you choose destinations, activities, and experiences
          tailored to your interests. Whether you seek cultural immersion,
          breathtaking landscapes, or thrilling outdoor adventures, we make it
          possible. Enjoy a hassle-free experience with our expert guidance,
          ensuring every detail is perfect. Start crafting your personalized
          journey and discover the best of Mongolia, your way!
        </p>
      </div>
      <div className="flex gap-10 w-full ml-5  items-center justify-center flex-col md:flex-row">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col w-full md:w-1/2"
        >
          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex flex-col w-full md:w-1/2">
              <h1> Where would you like to go *</h1>
              <input
                type="text"
                id="user_location"
                name="user_location"
                value={formData.user_location}
                onChange={handleChange}
                className="block w-full mt-5 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
                required
              />
              <h1 className="mt-5"> When would you like to go</h1>
              <input
                type="date"
                id="user_date"
                name="user_date"
                value={formData.user_date}
                onChange={handleChange}
                className="block w-full mt-5 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
                required
              />
              <h1 className="mt-5"> For how long (Minimum 5 nights) *</h1>
              <input
                type="text"
                id="user_duration"
                name="user_duration"
                value={formData.user_duration}
                onChange={handleChange}
                placeholder="7 nights, or 2 weeks"
                className="block w-full mt-5 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
                required
              />
              <h1 className="mt-10 text-[22px] font-bold">
                Your group and travel plans
              </h1>
              <h1 className="mt-5">
                How many traveling in your group? (Minimum 4 people) *
              </h1>
              <input
                type="number"
                id="user_groupSize"
                name="user_groupSize"
                value={formData.user_groupSize}
                onChange={handleChange}
                min="1"
                className="block w-full mt-5 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
                required
              />
              <h1 className="mt-5">
                Our Tailor_made trips are customised private departures
                Centerally, unless you have 6 or more people in your group
                idestination depentaly, price will be higher than our standard
                tours but the experience is will worth it
              </h1>
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
              <h1 className="font-bold text-[22px] mt-10">
                How much would you like to spend per person?
              </h1>
              <input
                type="text"
                id="user_budget"
                name="user_budget"
                min="50"
                className="block w-full mt-5 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
              />
              <h1 className="font-bold text-[22px] mt-10">
                Tell us about your travel plans
              </h1>
              intrepid Tailor-Made trips include an elment of touring if you are
              looking for just a hotel and transfer or an all-inclusive resort
              package, then we recommend reching out to a local travel agent, if
              you are looking to get to know the destination, meeting locals,
              and maybe try new food- we got you covered*
              <textarea
                name="message"
                rows={2}
                value={formData.message}
                onChange={handleChange}
                placeholder="Any must-haves in your ideal itinerary, your preferred style of accommodation, any special interests of your group..."
                className="form-control mt-5 border border-gray-600 w-full"
                style={{ height: "93px" }}
              ></textarea>
            </div>
            <div className="flex flex-col w-full md:w-1/2">
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
              <h1 className="mt-5">
                If you have seen a trip you love the look of on our website,
                please let us know the name or website link. Alternatively, if
                you have your own itinerary feel free to upload this; your
                consultant can work with you and your group on a proposal.
              </h1>
              <h1 className="font-bold text-[22px] mt-8">
                Your contact details
              </h1>
              <h1 className="mt-3">Name(as per passpord)*</h1>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder="First Name*"
                className="block w-full mt-5 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
                required
              />
              <input
                type="text"
                id="lai"
                name="lai"
                value={formData.user_lai}
                onChange={handleChange}
                placeholder="Last Name*"
                className="block w-full mt-5 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
                required
              />
              <h1 className="mt-10">Where are you from*</h1>
              <Select
                value={formData.selectedCountry || ""}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    selectedCountry: event.target.value,
                  });
                }}
                input={<OutlinedInput />}
                MenuProps={MenuProps}
                name="selectedCountry"
                required
                className="mt-5"
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
              <h1 className="mt-5">Email</h1>
              <input
                type="email"
                id="user_email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                placeholder="Email*"
                className="block w-full mt-3 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
                required
              />
              <h1 className="mt-5">Phone</h1>
              <input
                type="tel"
                id="user_phone"
                name="user_phone"
                value={formData.user_phone}
                onChange={handleChange}
                placeholder="Phone*"
                className="block w-full mt-3 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
                required
              />
              <FormGroup className="flex mt-10 gap-4">
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.user_receiveUpdates}
                      onChange={handleChange}
                      name="user_receiveUpdates"
                    />
                  }
                  label="I accept that all details provided will be held and used in accordance with the intrepid Travel Privacy Statement"
                />
              </FormGroup>
              <FormGroup className="flex mt-7">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.user_acceptPrivacy}
                      onChange={handleChange}
                      name="user_acceptPrivacy"
                      required
                    />
                  }
                  label="We'd love to contact you by email from time to time  about exciting travel news and products we think might interest you. Please tick this box if you are hapy to receive this"
                />
              </FormGroup>
              <Box className="mt-8 flex justify-center md:flex-row items-center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="py-2 px-6 rounded-lg  w-[500px]"
                >
                  Submit
                </Button>
              </Box>
              <Collapse in={open} className="mt-5">
                <Alert
                  severity="success"
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
                >
                  Your inquiry has been sent successfully! We'll get back to you
                  soon.
                </Alert>
              </Collapse>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
