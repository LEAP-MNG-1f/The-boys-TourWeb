"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export const EventsPages = () => {
  const [eventData, setEventData] = useState({
    name: "",
    introduction: "",
    season: "",
    date: "",
    categoryId: "",
    imageEvent: null,
  });

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const eventsResponse = await axios.get(
        "http://localhost:8000/api/events",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const categoriesResponse = await axios.get(
        "http://localhost:8000/api/categories",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setEvents(eventsResponse.data.data || eventsResponse.data);
      setCategories(categoriesResponse.data.data || categoriesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message || "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!deleteEventId) return;

    try {
      await axios.delete(`http://localhost:8000/api/events/${deleteEventId}`);

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== deleteEventId)
      );

      setDeleteEventId(null);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEventData((prev) => ({ ...prev, imageEvent: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(eventData).forEach((key) => {
      if (eventData[key] !== null && eventData[key] !== "") {
        formData.append(key, eventData[key]);
      }
    });

    try {
      await axios.post("http://localhost:8000/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setEventData({
        name: "",
        introduction: "",
        season: "",
        date: "",
        categoryId: "",
        imageEvent: null,
      });

      fetchData();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {deleteEventId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="modal-box bg-[#182237] w-full max-w-md rounded-lg">
            <h3 className="font-bold text-lg mb-4">Confirm Deletion</h3>
            <p className="py-4 text-white">
              Are you sure you want to delete this event?
            </p>
            <div className="modal-action flex justify-end space-x-2">
              <button
                className="btn btn-ghost text-white"
                onClick={() => setDeleteEventId(null)}
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleDeleteEvent}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-[#182237] shadow-xl">
        <div className="card-body p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
            <h2 className="card-title text-2xl font-bold text-white">
              Events Management
            </h2>
            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add New Event
            </button>
          </div>

          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
              <div className="modal-box bg-[#182237] w-full max-w-2xl rounded-lg max-h-[90vh] overflow-y-auto">
                <h3 className="font-bold text-lg mb-6 text-white">
                  Add New Event
                </h3>
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
                      <span className="label-text text-white">
                        Introduction
                      </span>
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
          )}

          <div className="mt-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : error ? (
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}. Please check your backend connection.</span>
                </div>
              </div>
            ) : events.length === 0 ? (
              <div className="alert alert-info shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-current flex-shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>No events found</span>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="card bg-[#182232] shadow-xl transform transition-all hover:scale-105 duration-300"
                  >
                    {event.imageEvent && (
                      <figure className="relative pt-[56.25%]">
                        <img
                          src={event.imageEvent}
                          alt={event.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </figure>
                    )}
                    <div className="card-body p-4">
                      <h3 className="card-title text-lg text-white mb-2">
                        {event.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="badge badge-outline text-xs">
                          {event.season}
                        </div>
                        <div className="badge badge-outline text-xs">
                          {event.date}
                        </div>
                        <div className="badge badge-outline text-xs">
                          {categories.find(
                            (category) => category._id === event.categoryId
                          )?.name || "Unknown Category"}
                        </div>
                      </div>
                      <div className="card-actions justify-end">
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => setDeleteEventId(event._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPages;
