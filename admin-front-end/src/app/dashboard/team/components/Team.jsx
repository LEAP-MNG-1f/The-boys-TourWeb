"use client";
import React, { useState, useEffect, useRef } from "react";

export const TeamPage = () => {
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    imageTeam: "",
    languege: "",
    exprience: "",
    introduction: "",
  });

  const [teamData, setTeamData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/teams");
        if (!response.ok) throw new Error(`Failed to fetch data`);
        const data = await response.json();
        setTeamData(data);
      } catch (error) {
        console.error("Error fetching team data:", error);
        alert("Error fetching team data. Please try again.");
      }
    };

    fetchTeamData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeamMember((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();

      setNewTeamMember({
        name: "",
        imageTeam: "",
        languege: "",
        exprience: "",
        introduction: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeamMember),
      });

      if (response.ok) {
        const newTeam = await response.json();
        setTeamData((prev) => [...prev, newTeam.data]);

        closeModal();
        alert("Team member added successfully!");
      } else {
        throw new Error("Failed to add team member");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding team member. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/teams/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete team member");
      }

      setTeamData((prev) => prev.filter((member) => member._id !== id));

      alert("Team member deleted successfully!");
    } catch (error) {
      console.error("Error deleting team member:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Team Page
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={openModal}
          className="btn btn-primary btn-md sm:btn-wide"
        >
          Add New Team Member
        </button>
      </div>

      <dialog ref={modalRef} className="modal modal-middle sm:modal-middle">
        <div className="modal-box w-11/12 max-w-2xl">
          <form method="dialog">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>

          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
            Create New Team Member
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={newTeamMember.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Image URL</span>
                </div>
                <input
                  type="text"
                  name="imageTeam"
                  value={newTeamMember.imageTeam}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Languages</span>
                </div>
                <input
                  type="text"
                  name="languege"
                  value={newTeamMember.languege}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Experience</span>
                </div>
                <input
                  type="text"
                  name="exprience"
                  value={newTeamMember.exprience}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="form-control w-full md:col-span-2">
                <div className="label">
                  <span className="label-text">Introduction</span>
                </div>
                <textarea
                  name="introduction"
                  value={newTeamMember.introduction}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full h-24"
                  required
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full mt-4"
            >
              {isSubmitting ? "Adding..." : "Add Team Member"}
            </button>
          </form>
        </div>
      </dialog>

      <div className="mt-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Team Members</h2>
        {teamData.length === 0 ? (
          <p className="text-center text-[25px] text-red-500 ">0 Members</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {teamData.map((teamMember) => (
              <div
                key={teamMember._id}
                className="card bg-base-100 shadow-md rounded-lg overflow-hidden"
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
                      <strong>Languages:</strong> {teamMember.languege}
                    </p>
                    <p>
                      <strong>Experience:</strong> {teamMember.exprience}
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
        )}
      </div>
    </div>
  );
};
