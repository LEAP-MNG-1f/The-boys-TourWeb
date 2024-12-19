import React from "react";

export const AddModal = ({
  handleSubmit,
  eventData,
  handleInputChange,
  categories,
  handleFileChange,
  setIsAddModalOpen,
}) => {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="modal-box bg-[#182237] w-full max-w-2xl rounded-lg max-h-[90vh] overflow-y-auto">
          <h3 className="font-bold text-lg mb-6 text-white">Add New Event</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Event Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={eventData.name}
                onChange={handleInputChange}
                placeholder="Enter event name"
                className="input input-bordered w-full bg-[#151c2c] text-white"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Introduction</span>
              </label>
              <textarea
                name="introduction"
                value={eventData.introduction}
                onChange={handleInputChange}
                placeholder="Event description"
                className="textarea textarea-bordered h-24 bg-[#151c2c] text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Season</span>
                </label>
                <input
                  type="text"
                  name="season"
                  value={eventData.season}
                  onChange={handleInputChange}
                  placeholder="Event season"
                  className="input input-bordered w-full bg-[#151c2c] text-white"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleInputChange}
                  className="input input-bordered w-full bg-[#151c2c] text-white"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Category</span>
              </label>
              <select
                name="categoryId"
                value={eventData.categoryId}
                onChange={handleInputChange}
                className="select select-bordered w-full bg-[#151c2c] text-white"
                required
              >
                <option value="" className="text-gray-500">
                  Select a category
                </option>
                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    className="text-white bg-[#151c2c]"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Event Image</span>
              </label>
              <input
                type="file"
                name="imageEvent"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full bg-[#151c2c] text-white"
                required
              />
            </div>

            <div className="modal-action flex justify-end space-x-2">
              <button
                type="button"
                className="btn btn-ghost text-white"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Submit Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
