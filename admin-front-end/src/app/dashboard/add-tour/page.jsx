"use client";

import React, { useState } from "react";
import axios from "axios";

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
  const [serviceInc, setServiceInc] = useState([]);
  const [serviceNotInc, setServiceNotInc] = useState([]);
  const [dailyPlans, setDailyPlans] = useState([]);

  const [previews, setPreviews] = useState([]);

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

    // console.log(arrayt)
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
      { day: "", activities: [], accommodation: [], periodOfTime: [] },
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
    for (let [key, value] of formDataObj.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch("http://localhost:8000/api/tours", {
        method: "POST",
        body: formDataObj, // Use FormData directly
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const data = await response.json(); // Expect a JSON response
      console.log("Response:", data);
      alert("Tour data submitted successfully!");
    } catch (error) {
      console.error("Error submitting tour data:", error);
      alert("Failed to submit tour data.");
    }
  };

  return (
    <div>
      <h1>Create a New Tour</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-5 w-[600px] "
      >
        {/* Basic Information */}
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="bg-[#182237] "
          />
        </label>
        <label className="flex ">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="bg-[#182237] "
          ></textarea>
        </label>
        <label>
          category name:
          <select
            name="categoryId"
            className="bg-[#182237]"
            onChange={handleChange}
            value={formData.categoryId}
            required
          >
            <option value="" disabled>
              Select a season
            </option>
            <option value="675ba6ee3fdf4d8ab7de61ac">Winter</option>
          </select>
        </label>

        <label>
          location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="bg-[#182237] "
          />
        </label>
        <label>
          Start Date:
          <input
            type="text"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="bg-[#182237] "
          />
        </label>
        <label>
          End Date:
          <input
            type="text"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="bg-[#182237] "
          />
        </label>
        {/* Price Section */}
        <div>
          <h3>Price Details: </h3>
          <div className="flex flex-col gap-4">
            {price.map((p, index) => (
              <div key={index} className="price-item">
                <label>
                  Pax:
                  <input
                    type="number"
                    value={p.pax}
                    onChange={(e) =>
                      handlePriceChange(index, "pax", e.target.value)
                    }
                    required
                    className="bg-[#182237]"
                  />
                </label>
                <label>
                  Per Person Price:
                  <input
                    type="text"
                    value={p.perPerson}
                    onChange={(e) =>
                      handlePriceChange(index, "perPerson", e.target.value)
                    }
                    required
                    className="bg-[#182237]"
                  />
                </label>
                <button
                  type="button"
                  className="btn btn-delete"
                  onClick={() => handleRemovePrice(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <button type="button" className="btn" onClick={handleAddPrice}>
            Add Price
          </button>
        </div>

        <h3>Daily Plans: </h3>
        {dailyPlans.map((plan, planIndex) => (
          <div key={planIndex}>
            <label>
              Day:
              <input
                type="text"
                value={plan.day}
                onChange={(e) =>
                  handleDailyPlanChange(planIndex, "day", e.target.value)
                }
                required
                className="bg-[#182237] "
              />
            </label>

            <h4>Accommodation details: </h4>
            <label>
              Accommodation Name:
              <input
                type="text"
                value={plan.accommodation[0]?.accomName || ""} // Use default empty string if undefined
                onChange={
                  (e) =>
                    handleAccommoChange(
                      planIndex,
                      0,
                      "accomName",
                      e.target.value
                    ) // Update the first accommodation
                }
                required
                className="bg-[#182237]"
              />
            </label>

            <label>
              Accommodation Notes:
              <textarea
                value={plan.accommodation[0]?.notes || ""} // Use default empty string if undefined
                onChange={
                  (e) =>
                    handleAccommoChange(planIndex, 0, "notes", e.target.value) // Update the notes of the first accommodation
                }
                className="bg-[#182237]"
              ></textarea>
            </label>

            <h4>Activities: </h4>
            {plan.activities.map((activity, activityIndex) => (
              <div key={activityIndex} className="activity-item">
                <label>
                  Activity Name:
                  <input
                    type="text"
                    value={activity.activityName}
                    onChange={(e) =>
                      handleActivityChange(
                        planIndex,
                        activityIndex,
                        "activityName",
                        e.target.value
                      )
                    }
                    required
                    className="bg-[#182237]"
                  />
                </label>
                <label>
                  Notes:
                  <textarea
                    value={activity.notes}
                    onChange={(e) =>
                      handleActivityChange(
                        planIndex,
                        activityIndex,
                        "notes",
                        e.target.value
                      )
                    }
                    required
                    className="bg-[#182237]"
                  ></textarea>
                </label>
                <button
                  type="button"
                  className="btn btn-delete"
                  onClick={() => handleRemoveActivity(planIndex, activityIndex)}
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn"
              onClick={() => handleAddActivity(planIndex)}
            >
              Add Activity
            </button>

            <h4>Period Of time:</h4>
            {plan.periodOfTime.map((pofTime, periodOfIndex) => (
              <div key={periodOfIndex}>
                <label>
                  When:
                  <input
                    type="text"
                    value={pofTime.when}
                    onChange={(e) =>
                      handlePeriodOfChange(
                        planIndex,
                        periodOfIndex,
                        "when",
                        e.target.value
                      )
                    }
                    required
                    className="bg-[#182237] "
                  />
                </label>
                <label>
                  Notes:
                  <textarea
                    value={pofTime.notes}
                    onChange={(e) =>
                      handlePeriodOfChange(
                        planIndex,
                        periodOfIndex,
                        "notes",
                        e.target.value
                      )
                    }
                    required
                    className="bg-[#182237] "
                  ></textarea>
                </label>
                <button
                  type="button"
                  className="btn btn-delete"
                  onClick={() =>
                    handleRemovePeriodOfTime(planIndex, periodOfIndex)
                  }
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn"
              onClick={() => handleAddPeriodOfTime(planIndex)}
            >
              Add period of time
            </button>

            <button
              type="button"
              className="btn btn-delete"
              onClick={() => handleRemoveDailyPlan(planIndex)}
            >
              X
            </button>
          </div>
        ))}
        <button type="button" className="btn" onClick={handleAddDailyPlan}>
          Add Daily Plan
        </button>

        <label>
          Service Included:
          <textarea
            name="serviceInclude"
            placeholder="Enter services (comma-separated)"
            onChange={handleAddServiceI}
            className="w-full p-2 border rounded bg-[#182237]"
            rows={4}
          />
        </label>

        <label>
          service not Included:
          <textarea
            name="serviceNotInclude"
            placeholder="Enter services (comma-separated)"
            onChange={handleAddServiceI}
            className="w-full p-2 border rounded bg-[#182237]"
            rows={4}
          />
        </label>
        <div className="mb-4">
          <label
            htmlFor="imageUpload"
            className="block mb-2 text-sm font-medium"
          >
            Upload Images
          </label>
          <input
            type="file"
            id="imageUpload"
            name="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-white
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
            required
          />
        </div>
        {previews.length > 0 && (
          <div className="flex space-x-2 mt-4">
            {previews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        )}
        {/* Submit Button */}
        <button type="submit" className="btn btn-success">
          Submit Tour
        </button>
      </form>
    </div>
  );
};

export default PostTourData;
