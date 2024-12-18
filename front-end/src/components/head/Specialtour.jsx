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
import Footer from "../Homepage/components/Footer";
import { SpecialComponents } from "./components/SpecialComponents";
import { HowMuchWould } from "./components/HowMuchWould";
import { IfYouHaveBeen } from "./components/IfYouHaveBeen";
import { EmailPhone } from "./components/EmailPhone";
import { PlanHeader } from "./components/PlanHeader";

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
      <HeaderPart
        home={false}
        customTour={true}
        event={false}
        aboutUs={false}
      />
      <div className="flex flex-col pt-10 mt-10 justify-center w-full md:w-1/2">
        <PlanHeader />
      </div>
      <div className="flex gap-10 w-full ml-5  items-center justify-center flex-col md:flex-row">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col w-full md:w-1/2"
        >
          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex flex-col w-full md:w-1/2">
              <SpecialComponents
                handleChange={handleChange}
                formData={formData}
              />
              <HowMuchWould handleChange={handleChange} formData={formData} />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <IfYouHaveBeen handleChange={handleChange} formData={formData} />
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
              <EmailPhone handleChange={handleChange} formData={formData} />
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
                  Your inquiry has been sent successfully! We&apos;ll get back
                  to you soon.
                </Alert>
              </Collapse>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
