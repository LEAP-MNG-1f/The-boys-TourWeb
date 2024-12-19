import React from "react";

export const EventsCategory = ({ events, categories, setDeleteEventId }) => {
  return (
    <div>
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
                <div className="badge badge-outline text-xs">{event.date}</div>
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
    </div>
  );
};
