"use client";

import React, { useEffect, useState } from "react";
import LocCateInfo from "./components/LocCateInfo";
import DateInfo from "./components/DateInfo";
import PriceSection from "./components/PriceSection";
import BasicInfo from "./components/BasicInfo";
import { TitleDescription } from "./components/TitleDescription";
import { ServiceIncludeNot } from "./components/ServiceIncludeNot";

const PostTourData = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    serviceInclude: [],
    serviceNotInclude: [],
    startDate: "",
    endDate: "",
    location: "",
    price: [],
    dailyPlans: [],
    images: [],
    createdAt: new Date().toISOString(),
  });

  const [price, setPrice] = useState([]);
  const [dailyPlans, setDailyPlans] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
        );
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Create image previews
    const filePreviews = files.map((file) => URL.createObjectURL(file));

    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));

    setPreviews(filePreviews);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPrice = () => {
    setPrice([...price, { pax: "", perPerson: "" }]);
  };
  const handleRemovePrice = (index) => {
    const updatedPrices = price.filter((_, i) => i !== index);
    setPrice(updatedPrices);
    setFormData((prevFormData) => ({ ...prevFormData, price: updatedPrices }));
  };

  const handleAddServiceI = (e) => {
    const { name, value } = e.target;

    const arrayt = value
      .match(/(?:[^,"]+|"[^"]*")+/g)
      ?.map((item) => item.replace(/^"|"$/g, "").trim())
      .filter((item) => item !== "");

    setFormData({ ...formData, [name]: arrayt });
  };

  const handlePriceChange = (index, field, value) => {
    const updatedPrices = [...price];
    updatedPrices[index][field] = value;
    setPrice(updatedPrices);
    setFormData({ ...formData, price: updatedPrices });
  };

  const handleAddDailyPlan = () => {
    setDailyPlans([
      ...dailyPlans,
      {
        day: "",
        dayTitle: "",
        activities: [],
        accommodation: [],
        periodOfTime: [],
      },
    ]);
  };

  const handleAccommoChange = (planIndex, accomIndex, field, value) => {
    const updatedPlans = [...dailyPlans];

    // Ensure the accommodation array exists and the specified index is valid
    if (!updatedPlans[planIndex].accommodation) {
      updatedPlans[planIndex].accommodation = [];
    }

    // If the accommodation at the given index doesn't exist, create it
    if (!updatedPlans[planIndex].accommodation[accomIndex]) {
      updatedPlans[planIndex].accommodation[accomIndex] = {
        accomName: "",
        notes: "",
      }; // Initialize with default values
    }

    updatedPlans[planIndex].accommodation[accomIndex][field] = value; // Update the specific field

    setDailyPlans(updatedPlans); // Update the state with the new dailyPlans
    setFormData({ ...formData, dailyPlans: updatedPlans }); // Update the formData state with the new dailyPlans
  };

  const handleRemoveDailyPlan = (index) => {
    const updatedPlans = dailyPlans.filter((_, i) => i !== index);
    setDailyPlans(updatedPlans);
    setFormData((prevFormData) => ({
      ...prevFormData,
      dailyPlans: updatedPlans,
    }));
  };

  const handleDailyPlanChange = (index, field, value) => {
    const updatedPlans = [...dailyPlans];
    updatedPlans[index][field] = value;
    setDailyPlans(updatedPlans);
    setFormData({ ...formData, dailyPlans: updatedPlans });
  };

  const handleAddActivity = (planIndex) => {
    const updatedPlans = [...dailyPlans];
    updatedPlans[planIndex].activities.push({ activityName: "", notes: "" });
    setDailyPlans(updatedPlans);
  };

  const handleRemoveActivity = (planIndex, activityIndex) => {
    setDailyPlans((prevPlans) => {
      const updatedPlans = prevPlans.map((plan, index) =>
        index === planIndex
          ? {
              ...plan,
              activities: plan.activities.filter(
                (_, idx) => idx !== activityIndex
              ),
            }
          : plan
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        dailyPlans: updatedPlans,
      }));

      return updatedPlans;
    });
  };

  const handleAddPeriodOfTime = (planIndex) => {
    const updatedPlans = [...dailyPlans];
    updatedPlans[planIndex].periodOfTime.push({ when: "", notes: "" });
    setDailyPlans(updatedPlans);
  };

  const handleRemovePeriodOfTime = (planIndex, pIndex) => {
    setDailyPlans((prevPlans) =>
      prevPlans.map((plan, index) =>
        index === planIndex
          ? {
              ...plan,
              periodOfTime: plan.periodOfTime.filter(
                (_, idx) => idx !== pIndex
              ),
            }
          : plan
      )
    );
  };

  const handleActivityChange = (planIndex, activityIndex, field, value) => {
    const updatedPlans = [...dailyPlans];
    updatedPlans[planIndex].activities[activityIndex][field] = value;
    setDailyPlans(updatedPlans);
    setFormData({ ...formData, dailyPlans: updatedPlans });
  };

  const handlePeriodOfChange = (planIndex, periodOfIndex, field, value) => {
    const updatedPlans = [...dailyPlans];
    updatedPlans[planIndex].periodOfTime[periodOfIndex][field] = value;
    setDailyPlans(updatedPlans);
    setFormData({ ...formData, dailyPlans: updatedPlans });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading

    // Create FormData object
    const formDataObj = new FormData();

    // Append text fields (simple fields)
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    formDataObj.append("categoryId", formData.categoryId);
    formDataObj.append("startDate", formData.startDate);
    formDataObj.append("endDate", formData.endDate);
    formDataObj.append("location", formData.location);
    formDataObj.append("createdAt", formData.createdAt);

    // Append array fields (like serviceInclude and serviceNotInclude)
    formDataObj.append("price", JSON.stringify(price)); // JSON-stringify the array
    formDataObj.append("dailyPlans", JSON.stringify(dailyPlans));
    formDataObj.append(
      "serviceInclude",
      JSON.stringify(formData.serviceInclude)
    );
    formDataObj.append(
      "serviceNotInclude",
      JSON.stringify(formData.serviceNotInclude)
    );

    // Append images (if any)
    formData.images.forEach((image) => {
      formDataObj.append("images", image); // Append each file separately
    });

    // Log FormData contents

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tours`,
        {
          method: "POST",
          body: formDataObj, // Use FormData directly
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const data = await response.json(); // Expect a JSON response

      // Clear form fields after submission
      setFormData({
        title: "",
        description: "",
        categoryId: "",
        startDate: "",
        endDate: "",
        location: "",
        createdAt: "",
        serviceInclude: [],
        serviceNotInclude: [],
        images: [],
      });
      setPrice([]);
      setDailyPlans([]);
      alert("Tour data submitted successfully!");
    } catch (error) {
      console.error("Error submitting tour data:", error);
      alert("Failed to submit tour data.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="py-16 ">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Create a New Tour
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start gap-6 w-full max-w-2xl mx-auto bg-[#1E293B] p-8 rounded-lg shadow-xl"
        >
          {/* Basic Information */}
          <TitleDescription formData={formData} handleChange={handleChange} />
          <LocCateInfo
            handleChange={handleChange}
            formData={formData}
            categories={categories}
          />
          <DateInfo handleChange={handleChange} formData={formData} />
          {/* Price Section */}
          <PriceSection
            price={price}
            handlePriceChange={handlePriceChange}
            handleRemovePrice={handleRemovePrice}
            handleAddPrice={handleAddPrice}
          />
          <BasicInfo
            handleSubmit={handleSubmit}
            handleDailyPlanChange={handleDailyPlanChange}
            dailyPlans={dailyPlans}
            handleAccommoChange={handleAccommoChange}
            handleActivityChange={handleActivityChange}
            handleRemoveActivity={handleRemoveActivity}
            handleAddActivity={handleAddActivity}
            handleAddPeriodOfTime={handleAddPeriodOfTime}
            handleRemoveDailyPlan={handleRemoveDailyPlan}
            handleRemovePeriodOfTime={handleRemovePeriodOfTime}
            handleAddDailyPlan={handleAddDailyPlan}
            handlePeriodOfChange={handlePeriodOfChange}
          />

          {/* The rest of the form remains the same, with similar styling applied */}
          <ServiceIncludeNot
            handleAddServiceI={handleAddServiceI}
            handleFileChange={handleFileChange}
            previews={previews}
          />
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full btn btn-success text-white py-3 rounded-md transition-colors font-semibold text-lg ${
              loading ? "bg-success cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Submitting..." : "Submit Tour"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostTourData;
