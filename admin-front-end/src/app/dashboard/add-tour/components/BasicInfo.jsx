import React from "react";

const BasicInfo = ({
  handleSubmit,
  handleDailyPlanChange,
  dailyPlans,
  handleAccommoChange,
  handleActivityChange,
  handleRemoveActivity,
  handleAddActivity,
  handleAddPeriodOfTime,
  handleRemoveDailyPlan,
  handleRemovePeriodOfTime,
  handleAddDailyPlan,
  handlePeriodOfChange,
}) => {
  return (
    <div>
      <div onSubmit={handleSubmit}>
        {/* Previous input fields remain the same */}

        <h3 className="text-lg font-semibold text-white">Daily Plans:</h3>
        {dailyPlans.map((plan, planIndex) => (
          <div
            key={planIndex}
            className="w-full bg-[#283747] p-4 rounded-lg mb-4"
          >
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-300 mb-2 block">
                Day:
              </span>
              <input
                type="number"
                placeholder="1, 2, 3 etc."
                value={plan.day}
                onChange={(e) =>
                  handleDailyPlanChange(planIndex, "day", e.target.value)
                }
                required
                className="bg-[#182237] w-full px-3 py-2 rounded border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-300 mb-2 block">
                Day title:
              </span>
              <input
                type="text"
                value={plan.dayTitle}
                onChange={(e) =>
                  handleDailyPlanChange(planIndex, "dayTitle", e.target.value)
                }
                required
                className="bg-[#182237] w-full px-3 py-2 rounded border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <h4 className="text-md font-medium text-gray-200 mt-4 mb-2">
              Accommodation details:
            </h4>
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-300 mb-2 block">
                Accommodation Name:
              </span>
              <input
                type="text"
                value={plan.accommodation[0]?.accomName || ""}
                onChange={(e) =>
                  handleAccommoChange(planIndex, 0, "accomName", e.target.value)
                }
                required
                className="bg-[#182237] w-full px-3 py-2 rounded border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-300 mb-2 block">
                Accommodation Notes:
              </span>
              <textarea
                value={plan.accommodation[0]?.notes || ""}
                onChange={(e) =>
                  handleAccommoChange(planIndex, 0, "notes", e.target.value)
                }
                className="bg-[#182237] w-full px-3 py-2 rounded border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              ></textarea>
            </label>

            <h4 className="text-md font-medium text-gray-200 mt-4 mb-2">
              Activities:
            </h4>
            {plan.activities.map((activity, activityIndex) => (
              <div
                key={activityIndex}
                className="bg-[#2C3E50] p-3 rounded mb-2"
              >
                <label className="block mb-2">
                  <span className="text-sm font-medium text-gray-300 mb-2 block">
                    Activity Name:
                  </span>
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
                    className="bg-[#182237] w-full px-3 py-2 rounded border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-sm font-medium text-gray-300 mb-2 block">
                    Notes:
                  </span>
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
                    className="bg-[#182237] w-full px-3 py-2 rounded border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  ></textarea>
                </label>
                <button
                  type="button"
                  className="btn btn-delete bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  onClick={() => handleRemoveActivity(planIndex, activityIndex)}
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors mt-2"
              onClick={() => handleAddActivity(planIndex)}
            >
              Add Activity
            </button>

            {/* Similar styling for Period of Time section */}
            <h4 className="text-md font-medium text-gray-200 mt-4 mb-2">
              Period Of Time:
            </h4>
            {plan.periodOfTime.map((pofTime, periodOfIndex) => (
              <div
                key={periodOfIndex}
                className="bg-[#2C3E50] p-3 rounded mb-2"
              >
                <label className="block mb-2">
                  <span className="text-sm font-medium text-gray-300 mb-2 block">
                    When:
                  </span>
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
                    className="bg-[#182237] w-full px-3 py-2 rounded border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-sm font-medium text-gray-300 mb-2 block">
                    Notes:
                  </span>
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
                    className="bg-[#182237] w-full px-3 py-2 rounded border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  ></textarea>
                </label>
                <button
                  type="button"
                  className="btn btn-delete bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
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
              className="btn bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors mt-2"
              onClick={() => handleAddPeriodOfTime(planIndex)}
            >
              Add Period of Time
            </button>

            <button
              type="button"
              className="btn btn-delete bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors mt-4"
              onClick={() => handleRemoveDailyPlan(planIndex)}
            >
              Remove Daily Plan
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          onClick={handleAddDailyPlan}
        >
          Add Daily Plan
        </button>

        {/* Rest of the form remains the same */}
      </div>
    </div>
  );
};

export default BasicInfo;
