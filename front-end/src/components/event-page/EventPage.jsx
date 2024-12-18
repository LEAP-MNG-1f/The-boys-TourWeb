"use client";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

const EventsPage = () => {
  const [activeSeason] = useState("All");
  const [events, setEvents] = useState([]);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/events");
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(`Failed to load events: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      return (
        activeSeason === "All" ||
        event.season?.toLowerCase() === activeSeason.toLowerCase()
      );
    });
  }, [events, activeSeason]);

  const toggleEventDescription = (eventId) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12 text-gray-500 mt-[200px]">
        Loading events...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-12 mt-[100px] lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold mb-4">
            Mongolian <span className="text-orange-500">Events</span>
          </h2>
          <h3 className="text-gray-600 text-lg mb-6">
            Experience the magic of Mongolia through our extraordinary events!
            From cultural festivals and adventurous tours to unique gatherings
            amidst breathtaking landscapes, we bring you unforgettable moments.
            Immerse yourself in the rich traditions and vibrant heritage of
            Mongolia, blended with modern touches to create a one-of-a-kind
            experience. Whether it's the vast steppes, majestic mountains, or
            the heartwarming hospitality of nomadic culture, our events are
            designed to connect you with the true essence of this remarkable
            land. Join us and embark on a journey that will leave you inspired,
            amazed, and forever in love with Mongolia!
          </h3>
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white border border-gray-200 rounded-xl shadow-2xl hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col gap-4">
                  <h2 className="font-bold text-gray-800 mb-2 text-2xl">
                    {event.name || "Untitled Event"}
                  </h2>
                  <img
                    src={event.imageEvent || "https://via.placeholder.com/400"}
                    className="w-full rounded-md h-[400px] object-cover"
                    alt={event.name || "Event Image"}
                  />
                </div>
                <p className="text-gray-500 mt-4">
                  {expandedEventId === (event._id || event.id)
                    ? event.introduction
                    : event.introduction?.slice(0, 100) + "..."}
                </p>
                <button
                  onClick={() => toggleEventDescription(event._id)}
                  className="text-blue-600 mt-4 flex items-center"
                >
                  {expandedEventId === event._id ? "Collapse" : "Read More"}
                </button>
                <div className="flex flex-col gap-2 mt-[20px]">
                  <p className="font-semibold text-xl">Date: {event.date}</p>
                  <p className="font-semibold text-xl">
                    Season: {event.season}
                  </p>
                  <div className="flex justify-end">
                    <Link href={"/view-all"}>
                      <button className=" text-white bg-orange-500 w-[200px] h-[40px] rounded-lg border border-orange-400">
                        {event.categoryId.name}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredEvents.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No events found matching your selected season.
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
