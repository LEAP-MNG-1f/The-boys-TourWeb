"use client";
import { useRef, useState } from "react";
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
import emailjs from "@emailjs/browser";
import Country from "./Contry";

export default function Special() {
  const [formData, setFormData] = useState({
    user_location: "",
    user_date: "",
    user_duration: "",
    user_groupSize: "",
    user_budget: "",
    user_name: "",
    user_email: "",
    lai: "",
    user_phone: "",
    message: "",
    user_country_select_demo: "",
    user_contactViaEmail: false,
    user_acceptPrivacy: false,
    user_receiveUpdates: false,
    user_travelingWithChildren: false,
    user_tailorExistingItinerary: false,
  });
  const [open, setOpen] = useState(false);
  const form = useRef();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCountryChange = (country) => {
    setFormData((prevData) => ({
      ...prevData,
      user_country_select_demo: country,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_jlg3mrb", "template_catf42r", form.current, {
        publicKey: "7QzFdmcdwTabvK-Fg",
      })
      .then(
        () => {
          console.log("Form submitted successfully!");
          setOpen(true);
        },
        (error) => {
          console.log("Failed to send form...", error.text);
        }
      );
  };

  return (
    <div className="flex justify-center">
      <HeaderPart />
      <div className="flex gap-10 pt-20 mt-20">
        <form ref={form} onSubmit={sendEmail}>
          <div className="flex flex-col justify-center w-[500px] h-[100px]">
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Where would you like to go *
            </label>
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
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              When would you like to go
            </label>
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
            <label
              htmlFor="duration"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              For how long (Minimum 5 nights) *
            </label>
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
            <label
              htmlFor="user_groupSize"
              className="block text-sm font-medium leading-6 mt-5 text-gray-900"
            >
              How many traveling in your group? (Minimum 4 people) *
            </label>
            <input
              type="number"
              id="user_groupSize"
              name="user_groupSize"
              value={formData.user_groupSize}
              onChange={handleChange}
              min="1"
              className="block w-full py-1.5 px-3 text-base text-gray-900 rounded-md bg-white outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
              required
            />
          </div>

          <div className="mt-5">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.travelingWithChildren}
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
          </div>

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
              <Country
                selectedCountry={formData.user_country_select_demo}
                onCountryChange={(country) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    user_country_select_demo: country,
                  }))
                }
              />
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Email Address
            </label>
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
                label="Contact me via email"
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
                label="I accept the Intrepid Travel Privacy Statement"
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
                label="I would like to receive updates about travel news and products"
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
                Send
              </Button>
            </div>
          </Box>
        </form>
      </div>
    </div>
  );
}
