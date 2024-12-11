"use client";

// import React, { useState } from "react";
// import axios from "axios";

// const PostTourData = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     serviceInclude: "",
//     serviceNotInclude: "",
//     startDate: "",
//     endDate: "",
//     location: "",
//     price: [],
//     dailyPlans: [],
//   });

//   const [price, setPrice] = useState([]);
//   const [dailyPlans, setDailyPlans] = useState([]);
//   const [serviceInclude, setServiceInclude] = useState([]);
//   const [serviceNotInclude, setServiceNotInclude] = useState([]);
//   const [images, setImages] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAddPrice = () => {
//     setPrice([...price, { pax: "", perPerson: "" }]);
//   };

//   const handlePriceChange = (index, field, value) => {
//     const updatedPrices = [...price];
//     updatedPrices[index][field] = value;
//     setPrice(updatedPrices);
//     setFormData({ ...formData, price: updatedPrices });
//   };

//   const handleAddDailyPlan = () => {
//     setDailyPlans([
//       ...dailyPlans,
//       { day: "", activities: [], periodOfTime: [], accommodation: "" },
//     ]);
//   };

//   const handleDailyPlanChange = (index, field, value) => {
//     const updatedPlans = [...dailyPlans];
//     updatedPlans[index][field] = value;
//     setDailyPlans(updatedPlans);
//     setFormData({ ...formData, dailyPlans: updatedPlans });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // try {
//     //   const response = await axios.post(
//     //     "https://your-api-endpoint.com/tours",
//     //     formData
//     //   );
//     //   console.log("Response:", response.data);
//     //   alert("Tour data submitted successfully!");
//     // } catch (error) {
//     //   console.error("Error submitting tour data:", error);
//     //   alert("Failed to submit tour data.");
//     // }
//     console.log(formData);
//   };

//   return (
//     <div className="mt-5">
//       <h1>Create a New Tour</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
//         {/* Basic Information */}
//         <label>
//           Title:
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="bg-[#182237] "
//           />
//         </label>

//         <label>
//           Description:
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             className="bg-[#182237] "
//           ></textarea>
//         </label>

//         {/* Price Section */}
//         <h3>Price Details</h3>
//         {price.map((p, index) => (
//           <div key={index}>
//             <label>
//               Pax:
//               <input
//                 type="number"
//                 value={p.pax}
//                 onChange={(e) =>
//                   handlePriceChange(index, "pax", e.target.value)
//                 }
//                 required
//                 className="bg-[#182237] "
//               />
//             </label>
//             <label>
//               Per Person Price:
//               <input
//                 type="text"
//                 value={p.perPerson}
//                 onChange={(e) =>
//                   handlePriceChange(index, "perPerson", e.target.value)
//                 }
//                 required
//                 className="bg-[#182237] "
//               />
//             </label>
//           </div>
//         ))}
//         <button type="button" onClick={handleAddPrice}>
//           Add Price
//         </button>
//         <br />

//         {/* Daily Plans Section */}
//         <h3>Daily Plans</h3>
//         {dailyPlans.map((plan, index) => (
//           <div key={index}>
//             <label>
//               Day:
//               <input
//                 type="text"
//                 value={plan.day}
//                 onChange={(e) =>
//                   handleDailyPlanChange(index, "day", e.target.value)
//                 }
//                 required
//                 className="bg-[#182237] "
//               />
//             </label>
//             <label>
//               Activities:
//               <input
//                 type="text"
//                 value={plan.activities}
//                 onChange={(e) =>
//                   handleDailyPlanChange(index, "activities", e.target.value)
//                 }
//                 required
//                 className="bg-[#182237] "
//               />
//             </label>
//             <label>
//               Accommodation:
//               <input
//                 type="text"
//                 value={plan.accommodation}
//                 onChange={(e) =>
//                   handleDailyPlanChange(index, "accommodation", e.target.value)
//                 }
//                 required
//                 className="bg-[#182237] "
//               />
//             </label>
//           </div>
//         ))}
//         <button type="button" onClick={handleAddDailyPlan}>
//           Add Daily Plan
//         </button>
//         <br />

//         {/* Submit Button */}
//         <button type="submit">Submit Tour</button>
//       </form>
//     </div>
//   );
// };

// export default PostTourData;

import React, { useState } from "react";
import axios from "axios";

const PostTourData = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    serviceInclude: "",
    serviceNotInclude: "",
    startDate: "",
    endDate: "",
    location: "",
    price: [],
    dailyPlans: [],
    createdAt: new Date().toISOString(),
  });

  const [price, setPrice] = useState([]);
  const [dailyPlans, setDailyPlans] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPrice = () => {
    setPrice([...price, { pax: "", perPerson: "" }]);
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
      { day: "", activities: [], accommodation: "", periodOfTime: [] },
    ]);
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

  const handleAddPeriodOfTime = (planIndex) => {
    const updatedPlans = [...dailyPlans];
    updatedPlans[planIndex].periodOfTime.push({ when: "", notes: "" });
    setDailyPlans(updatedPlans);
  };

  const handleActivityChange = (planIndex, activityIndex, field, value) => {
    const updatedPlans = [...dailyPlans];
    updatedPlans[planIndex].activities[activityIndex][field] = value;
    setDailyPlans(updatedPlans);
    setFormData({ ...formData, dailyPlans: updatedPlans });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post(
    //     "https://your-api-endpoint.com/tours",
    //     formData
    //   );
    //   console.log("Response:", response.data);
    //   alert("Tour data submitted successfully!");
    // } catch (error) {
    //   console.error("Error submitting tour data:", error);
    //   alert("Failed to submit tour data.");
    // }
    console.log(formData);
  };

  return (
    <div>
      <h1>Create a New Tour</h1>
      <form onSubmit={handleSubmit}>
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
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="bg-[#182237] "
          ></textarea>
        </label>
        <br />

        {/* Price Section */}
        <h3>Price Details</h3>
        {price.map((p, index) => (
          <div key={index}>
            <label>
              Pax:
              <input
                type="number"
                value={p.pax}
                onChange={(e) =>
                  handlePriceChange(index, "pax", e.target.value)
                }
                required
                className="bg-[#182237] "
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
                className="bg-[#182237] "
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddPrice}>
          Add Price
        </button>
        <br />

        {/* Daily Plans Section */}
        <h3>Daily Plans</h3>
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
            <label>
              Accommodation:
              <input
                type="text"
                value={plan.accommodation}
                onChange={(e) =>
                  handleDailyPlanChange(
                    planIndex,
                    "accommodation",
                    e.target.value
                  )
                }
                required
                className="bg-[#182237] "
              />
            </label>

            <h4>Activities</h4>
            {plan.activities.map((activity, activityIndex) => (
              <div key={activityIndex}>
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
                    className="bg-[#182237] "
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
                    className="bg-[#182237] "
                  ></textarea>
                </label>
              </div>
            ))}
            <button type="button" onClick={() => handleAddActivity(planIndex)}>
              Add Activity
            </button>

            <h4>Period Of time</h4>
            {plan.periodOfTime.map((pofTime, periodOfIndex) => (
              <div key={periodOfIndex}>
                <label>
                  When:
                  <input
                    type="text"
                    value={pofTime.when}
                    onChange={(e) =>
                      handleAddPeriodOfTime(
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
                      handleAddPeriodOfTime(
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
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddPeriodOfTime(planIndex)}
            >
              Add period of time
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddDailyPlan}>
          Add Daily Plan
        </button>
        <br />

        {/* Submit Button */}
        <button type="submit">Submit Tour</button>
      </form>
    </div>
  );
};

export default PostTourData;
