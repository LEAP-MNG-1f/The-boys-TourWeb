// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export const EventsPages = () => {
//   const [eventData, setEventData] = useState({
//     name: "",
//     introduction: "",
//     season: "",
//     date: "",
//     categoryId: "",
//     imageEvent: null,
//   });

//   const [events, setEvents] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Improved fetch events function with error handling
//   const fetchEvents = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get("http://localhost:8000/api/events", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("Fetched events:", response.data);

//       // Adjust based on your backend response structure
//       setEvents(response.data.data || response.data);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       setError(error.message || "Failed to fetch events");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEventData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setEventData((prev) => ({ ...prev, imageEvent: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.keys(eventData).forEach((key) => {
//       if (eventData[key] !== null && eventData[key] !== "") {
//         formData.append(key, eventData[key]);
//       }
//     });

//     try {
//       await axios.post("http://localhost:8000/api/events", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       // Reset form and refresh events
//       setEventData({
//         name: "",
//         introduction: "",
//         season: "",
//         date: "",
//         categoryId: "",
//         imageEvent: null,
//       });

//       fetchEvents();
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error adding event:", error);
//       alert("Failed to add event: " + error.message);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="card bg-base-100 shadow-xl">
//         <div className="card-body">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="card-title">Events Management</h2>
//             <button
//               className="btn btn-primary"
//               onClick={() => setIsModalOpen(true)}
//             >
//               Add New Event
//             </button>
//           </div>

//           {/* Modal for adding events */}
//           {isModalOpen && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//               <div className="modal-box">
//                 <h3 className="font-bold text-lg mb-4">Add New Event</h3>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text">Event Name</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={eventData.name}
//                       onChange={handleInputChange}
//                       placeholder="Enter event name"
//                       className="input input-bordered w-full"
//                       required
//                     />
//                   </div>

//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text">Introduction</span>
//                     </label>
//                     <textarea
//                       name="introduction"
//                       value={eventData.introduction}
//                       onChange={handleInputChange}
//                       placeholder="Event description"
//                       className="textarea textarea-bordered h-24"
//                       required
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="form-control">
//                       <label className="label">
//                         <span className="label-text">Season</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="season"
//                         value={eventData.season}
//                         onChange={handleInputChange}
//                         placeholder="Event season"
//                         className="input input-bordered w-full"
//                         required
//                       />
//                     </div>
//                     <div className="form-control">
//                       <label className="label">
//                         <span className="label-text">Date</span>
//                       </label>
//                       <input
//                         type="date"
//                         name="date"
//                         value={eventData.date}
//                         onChange={handleInputChange}
//                         className="input input-bordered w-full"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text">Category ID</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="categoryId"
//                       value={eventData.categoryId}
//                       onChange={handleInputChange}
//                       placeholder="Enter category ID"
//                       className="input input-bordered w-full"
//                       required
//                     />
//                   </div>

//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text">Event Image</span>
//                     </label>
//                     <input
//                       type="file"
//                       name="imageEvent"
//                       onChange={handleFileChange}
//                       className="file-input file-input-bordered w-full"
//                       required
//                     />
//                   </div>

//                   <div className="modal-action">
//                     <button
//                       type="button"
//                       className="btn"
//                       onClick={() => setIsModalOpen(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button type="submit" className="btn btn-primary">
//                       Submit Event
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}

//           {/* Events List */}
//           <div className="mt-4">
//             {isLoading ? (
//               <div className="text-center">
//                 <span className="loading loading-spinner loading-lg"></span>
//               </div>
//             ) : error ? (
//               <div className="alert alert-error">
//                 {error}. Please check your backend connection.
//               </div>
//             ) : events.length === 0 ? (
//               <div className="alert alert-info">No events found</div>
//             ) : (
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {events.map((event) => (
//                   <div key={event._id} className="card bg-base-100 shadow-xl">
//                     {event.imageEvent && (
//                       <figure>
//                         <img
//                           src={event.imageEvent}
//                           alt={event.name}
//                           className="w-full h-48 object-cover"
//                         />
//                       </figure>
//                     )}
//                     <div className="card-body">
//                       <h3 className="card-title">{event.name}</h3>

//                       <div className="card-actions justify-between">
//                         <div className="badge badge-outline">
//                           {event.season}
//                         </div>
//                         <div className="badge badge-outline">{event.date}</div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventsPages;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch events from the backend
  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/events", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Fetched events:", response.data);
      setEvents(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(error.message || "Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  // New delete event function
  const handleDeleteEvent = async (eventId) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8000/api/events/${eventId}`);

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );

      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event: " + error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
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

      // Reset form and refresh events
      setEventData({
        name: "",
        introduction: "",
        season: "",
        date: "",
        categoryId: "",
        imageEvent: null,
      });

      fetchEvents();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event: " + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Events Management</h2>
            <button
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Add New Event
            </button>
          </div>
          {/* Modal for adding events (previous implementation remains the same) */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Add New Event</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {" "}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Event Name</span>
                    </label>{" "}
                    <input
                      type="text"
                      name="name"
                      value={eventData.name}
                      onChange={handleInputChange}
                      placeholder="Enter event name"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Introduction</span>
                    </label>
                    <textarea
                      name="introduction"
                      value={eventData.introduction}
                      onChange={handleInputChange}
                      placeholder="Event description"
                      className="textarea textarea-bordered h-24"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Season</span>
                      </label>
                      <input
                        type="text"
                        name="season"
                        value={eventData.season}
                        onChange={handleInputChange}
                        placeholder="Event season"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Date</span>
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Category ID</span>
                    </label>
                    <input
                      type="text"
                      name="categoryId"
                      value={eventData.categoryId}
                      onChange={handleInputChange}
                      placeholder="Enter category ID"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Event Image</span>
                    </label>
                    <input
                      type="file"
                      name="imageEvent"
                      onChange={handleFileChange}
                      className="file-input file-input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="modal-action">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
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
                  <div key={event._id} className="card bg-base-100 shadow-xl">
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
                      <p>{event.introduction}</p>
                      <div className="card-actions justify-between items-center">
                        <div className="space-x-2">
                          <div className="badge badge-outline">
                            {event.season}
                          </div>
                          <div className="badge badge-outline">
                            {event.date}
                          </div>
                        </div>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => handleDeleteEvent(event._id)}
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
