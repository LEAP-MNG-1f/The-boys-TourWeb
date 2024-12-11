"use client";
import { useState, useMemo } from "react";

const EventsPage = () => {
  const [activeSeason, setActiveSeason] = useState("All");
  const [expandedEventId, setExpandedEventId] = useState(null); // State to track expanded event

  const seasons = ["All", "Spring", "Summer", "Autumn", "Winter"];

  const events = [
    {
      id: 1,
      title: "Digital Transformation Forum",
      date: "July 15, 2024",
      season: "Summer",
      image:
        "https://good-nature-blog-uploads.s3.amazonaws.com/uploads/2013/10/Camp.jpg",
      description:
        "Explore the latest trends in digital transformation and innovation strategies for modern businesses. Join industry leaders and innovators for an immersive experience.",
      fullDescription:
        "Explore the latest trends in digital transformation and innovation strategies for modern businesses. Join industry leaders and innovators for an immersive experience in digital transformation, AI, cloud computing, and the future of business operations. Learn practical strategies and tools to drive your organization's transformation.",
    },
    {
      id: 2,
      title: "AI & Machine Learning Workshop",
      date: "March 20, 2024",
      season: "Spring",
      image:
        "https://news.mn/en/wp-content/uploads/sites/3/2022/05/Orkhon-waterfall-Orkhon-valley-Mongolia.jpg",
      description:
        "Hands-on workshop diving deep into practical applications of AI and machine learning technologies. Limited seats available!",
      fullDescription:
        "Hands-on workshop diving deep into practical applications of AI and machine learning technologies. Learn about supervised and unsupervised learning, neural networks, data pre-processing, and much more. Limited seats available for this exciting workshop, don't miss out on the chance to enhance your skills!",
    },
    {
      id: 3,
      title: "Startup Ecosystem Meetup",
      date: "October 15, 2024",
      season: "Autumn",
      image:
        "https://www.discovermongolia.mn/uploads/Gall-Central-shireet-lake.jpg",
      description:
        "Network with local entrepreneurs, share experiences, and explore collaboration opportunities. This event brings together key figures in the startup world.",
      fullDescription:
        "Network with local entrepreneurs, share experiences, and explore collaboration opportunities. This vibrant meetup brings together innovative entrepreneurs from various industries to discuss challenges, share success stories, and form new partnerships. Whether you're looking for mentorship or potential investors, this event offers something for everyone in the startup ecosystem.",
    },
    {
      id: 4,
      title: "Winter Innovation Conference",
      date: "January 22, 2024",
      season: "Winter",
      image:
        "https://www.stepperiders.mn/public/storage/scJB23uf9SGsD1kzSparTueVnLzkzgRlOM2pyJVM.jpg",
      description: "hi",
      fullDescription:
        "Annual conference exploring technological innovations and future trends. Join experts and leaders from various tech industries as they discuss cutting-edge advancements in AI, blockchain, IoT, and more. Attend workshops and keynote speeches to understand how these technologies will shape our future.",
    },
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      return activeSeason === "All" || event.season === activeSeason;
    });
  }, [activeSeason]);

  const toggleEventDescription = (eventId) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-12 mt-[100px] lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center space-x-4 mb-6">
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => setActiveSeason(season)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  activeSeason === season
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              {season}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {event.title}
                  </h2>
                  <img
                    src={event.image}
                    className="w-full rounded-md h-[400px] object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 mt-[20px]">
                  <p className="text-gray-500">{event.date}</p>
                  <p className="text-gray-600">Season: {event.season}</p>
                </div>
                <p className="text-gray-500 mt-4">
                  {expandedEventId === event.id
                    ? event.fullDescription
                    : event.description}
                </p>
                <button
                  onClick={() => toggleEventDescription(event.id)}
                  className="text-blue-600 mt-4 flex items-center"
                >
                  {expandedEventId === event.id ? (
                    <>
                      <span className="mr-2">Collapse</span>
                    </>
                  ) : (
                    <>
                      <span className="mr-2">Read More</span>
                    </>
                  )}
                </button>
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
