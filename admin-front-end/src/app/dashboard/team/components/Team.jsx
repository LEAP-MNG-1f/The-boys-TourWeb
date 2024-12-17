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
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Team Page</h1>

      <div className="flex justify-center mb-4">
        <button onClick={openModal} className="btn btn-primary">
          Add New Team Member
        </button>
      </div>

      <dialog
        ref={modalRef}
        className="modal w-full flex justify-center items-center"
      >
        <div className="modal-box">
          <form method="dialog">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>

          <h2 className="text-2xl font-semibold mb-4 text-center">
            Create New Team Member
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Introduction</span>
              </div>
              <textarea
                name="introduction"
                value={newTeamMember.introduction}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                required
              />
            </label>

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
        <h2 className="text-2xl font-bold mb-4">Team Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamData.map((teamMember) => (
            <div
              key={teamMember._id}
              className="card bg-base-100 shadow-md rounded-lg"
            >
              <figure>
                <img
                  src={teamMember.imageTeam}
                  alt={teamMember.name}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg font-bold">
                  {teamMember.name}
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Languages:</strong> {teamMember.languege}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Experience:</strong> {teamMember.exprience}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Introduction:</strong> {teamMember.introduction}
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleDelete(teamMember._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
