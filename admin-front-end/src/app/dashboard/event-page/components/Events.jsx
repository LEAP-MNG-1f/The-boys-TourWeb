"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ConfirmDeletion } from "./ConfirmDeletion";
import { AddModal } from "./AddModal";
import { ErrorEvent } from "./ErrorEvent";
import { NoEvent } from "./NoEvent";
import { EventsCategory } from "./EventsCategory";

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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/events`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const categoriesResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
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
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${deleteEventId}`
      );

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
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/events`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
        <ConfirmDeletion
          setDeleteEventId={setDeleteEventId}
          handleDeleteEvent={handleDeleteEvent}
        />
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
            <AddModal
              handleSubmit={handleSubmit}
              eventData={eventData}
              handleInputChange={handleInputChange}
              categories={categories}
              handleFileChange={handleFileChange}
              setIsAddModalOpen={setIsAddModalOpen}
            />
          )}

          <div className="mt-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : error ? (
              <div className="alert alert-error shadow-lg">
                <ErrorEvent error={error} />
              </div>
            ) : events.length === 0 ? (
              <NoEvent />
            ) : (
              <EventsCategory
                events={events}
                categories={categories}
                setDeleteEventId={setDeleteEventId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPages;
