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
    <div className="container mx-auto p-4">
      {deleteEventId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal modal-open  ">
            <div className="modal-box bg-[#182237]">
              <h3 className="font-bold text-lg">Confirm Deletion</h3>
              <p className="py-4">
                Are you sure you want to delete this event?
              </p>
              <div className="modal-action">
                <button className="btn" onClick={() => setDeleteEventId(null)}>
                  Cancel
                </button>
                <button className="btn btn-error" onClick={handleDeleteEvent}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-[#182237] shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Events Management</h2>
            <button
              className="btn btn-primary"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add New Event
            </button>
          </div>

          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#182237] bg-opacity-50">
              <div className="modal-box bg-[#182237] ">
                <h3 className="font-bold text-lg mb-4">Add New Event</h3>
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
                      className="input input-bordered w-full bg-[#151c2c] "
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
                      className="textarea textarea-bordered h-24 bg-[#151c2c]"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                        className="input input-bordered w-full bg-[#151c2c]"
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
                        className="input input-bordered w-full bg-[#151c2c]"
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
                      className="select select-bordered w-full bg-[#151c2c]"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
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
                      className="file-input file-input-bordered w-full bg-[#151c2c]"
                      required
                    />
                  </div>
                  <div className="modal-action">
                    <button
                      type="button"
                      className="btn"
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

          <div className="mt-4">
            {isLoading ? (
              <div className="text-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : error ? (
              <div className="alert alert-error">
                {error}. Please check your backend connection.
              </div>
            ) : events.length === 0 ? (
              <div className="alert alert-info">No events found</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                  <div key={event._id} className="card bg-[#182232] shadow-xl">
                    {event.imageEvent && (
                      <figure>
                        <img
                          src={event.imageEvent}
                          alt={event.name}
                          className="w-full h-48 object-cover"
                        />
                      </figure>
                    )}
                    <div className="card-body">
                      <h3 className="card-title">{event.name}</h3>
                      <div className="card-actions justify-between items-center">
                        <div className="space-x-2">
                          <div className="badge badge-outline">
                            {event.season}
                          </div>
                          <div className="badge badge-outline">
                            {event.date}
                          </div>
                          <div className="badge badge-outline">
                            {categories.find(
                              (category) => category._id === event.categoryId
                            )?.name || "Unknown Category"}
                          </div>
                        </div>
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
