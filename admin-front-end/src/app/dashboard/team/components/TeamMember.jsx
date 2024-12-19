import React from "react";

export const TeamMember = ({ teamData, handleDelete }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {teamData.map((teamMember) => (
          <div
            key={teamMember._id}
            className="card bg-[#182237] shadow-md rounded-lg overflow-hidden"
          >
            <figure className="aspect-video">
              <img
                src={teamMember.imageTeam}
                alt={teamMember.name}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body p-4">
              <h3 className="card-title text-base md:text-lg font-bold mb-2">
                {teamMember.name}
              </h3>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Languages:</strong> {teamMember.language}
                </p>
                <p>
                  <strong>Experience:</strong> {teamMember.experience}
                </p>
                <p className="line-clamp-2">
                  <strong>Introduction:</strong> {teamMember.introduction}
                </p>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => handleDelete(teamMember._id)}
                  className="btn btn-error btn-xs sm:btn-sm"
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
