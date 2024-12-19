import React from "react";

export const TitleDescription = ({ formData, handleChange }) => {
  return (
    <div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-[#182237] border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-[#182237] border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          ></textarea>
        </label>
      </div>
    </div>
  );
};
