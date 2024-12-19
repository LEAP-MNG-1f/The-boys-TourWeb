import React from "react";

const LocCateInfo = ({ handleChange, formData, categories }) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Category
        <select
          name="categoryId"
          className="mt-1 block w-full bg-[#182237] border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          value={formData.categoryId}
          required
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}{" "}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-medium text-gray-300 mb-2">
        Location
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          placeholder="image URL"
          className="mt-1 block w-full bg-[#182237] border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
    </div>
  );
};

export default LocCateInfo;
