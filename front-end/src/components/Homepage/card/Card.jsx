"use client";
import Link from "next/link";

export const Card = ({ selectedCategory, tourData }) => {
  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return "No description available";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tourData.map((tour) => (
        <div
          key={tour._id}
          className="w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative group"
        >
          {/* Image */}
          <img
            className="w-full h-60 object-cover transform transition-transform duration-500 group-hover:scale-110"
            src={
              tour.images && tour.images.length > 0
                ? tour.images[0]
                : "https://via.placeholder.com/400x250?text=Tour+Image"
            }
            alt={tour.title || "Tour Image"}
          />

          {/* Description Overlay (Behind Content) */}
          <div className="absolute inset-0 bg-black bg-opacity-70 p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white h-full flex flex-col">
              <h4 className="text-xl font-bold mb-3">{tour.title}</h4>
              <div className="text-gray-200 text-base leading-relaxed">
                <p>{truncateDescription(tour.description, 150)}</p>
              </div>
            </div>
          </div>

          {/* Content Section (On Top of Description) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white z-20">
            <h3 className="font-semibold text-lg">
              {tour.title || "Untitled Tour"}
            </h3>
            <div className="flex items-center justify-between mt-2">
              <div>
                <span className="font-semibold text-lg">
                  {tour.price && tour.price.length > 0
                    ? `$${tour.price[0].perPerson} (per person)`
                    : "Price not available"}
                </span>
                <p className="text-sm text-gray-200">
                  {tour.startDate || "Start date not available"}
                </p>
              </div>
              <Link href={`/tour/${tour._id}`}>
                <button className="border border-white text-white rounded-lg py-2 px-4 hover:bg-white hover:text-black transition-all duration-300">
                  Book now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
