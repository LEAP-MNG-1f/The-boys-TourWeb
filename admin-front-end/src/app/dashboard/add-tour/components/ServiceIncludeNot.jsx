import React from "react";

export const ServiceIncludeNot = ({
  handleAddServiceI,
  handleFileChange,
  previews,
}) => {
  return (
    <div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Service Included
          <textarea
            name="serviceInclude"
            placeholder="Enter services (comma-separated)"
            onChange={handleAddServiceI}
            className="mt-1 block w-full bg-[#182237] border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          />
        </label>
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Service Not Included
          <textarea
            name="serviceNotInclude"
            placeholder="Enter services (comma-separated)"
            onChange={handleAddServiceI}
            className="mt-1 block w-full bg-[#182237] border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          />
        </label>
      </div>
      <div className="w-full">
        <label
          htmlFor="imageUpload"
          className="block mb-2 text-sm font-medium text-gray-300"
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
    </div>
  );
};
