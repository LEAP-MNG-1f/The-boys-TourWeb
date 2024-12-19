import React from "react";

const DateInfo = ({ handleChange, formData }) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Start Date
        <input
          type="text"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          placeholder="2024/12/03 or all season etc."
          className="mt-1 block w-full bg-[#182237] border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="block text-sm font-medium text-gray-300 mb-2">
        End Date
        <input
          type="text"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          placeholder="2030/12/03 or Dont fill this field if start date is all season"
          className="mt-1 block w-full bg-[#182237] border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
    </div>
  );
};

export default DateInfo;
