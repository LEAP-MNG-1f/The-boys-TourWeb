"use client";
import React, { useState, useEffect } from "react";

export const TeamPage = () => {
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    imageTeam: "",
    language: "",
    experience: "",
    introduction: "", // Added introduction field
  });

  const [teamData, setTeamData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  // Fetch team data when the component mounts
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/team");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setTeamData(data.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
        alert(
          "Error fetching team data. Please check the console for details."
        );
      }
    };

    fetchTeamData();
  }, []);

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeamMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to add a new team member
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, imageTeam, language, experience, introduction } =
      newTeamMember;

    try {
      const response = await fetch("http://localhost:8000/api/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          imageTeam,
          language,
          experience,
          introduction,
        }), // Include introduction
      });

      if (response.ok) {
        const newTeam = await response.json();
        setTeamData((prev) => [...prev, newTeam.data]);
        setNewTeamMember({
          name: "",
          imageTeam: "",
          language: "",
          experience: "",
          introduction: "", // Reset introduction
        });
        alert("Team member added successfully!");
      } else {
        alert("Failed to add team member.");
      }
    } catch (error) {
      console.error("Error adding team member:", error);
      alert("Error adding team member.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="team-page">
      <h1>Team Page</h1>
      <button
        onClick={() => setShowForm((prev) => !prev)} // Toggle form visibility
      >
        Add New Team Member
      </button>

      {/* Add Team Member Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 border p-4 rounded">
          <h2>Create New Team Member</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newTeamMember.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="imageTeam"
              value={newTeamMember.imageTeam}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Languages:
            <input
              type="text"
              name="language"
              value={newTeamMember.language}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Experience:
            <input
              type="text"
              name="experience"
              value={newTeamMember.experience}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Introduction:
            <textarea
              name="introduction"
              value={newTeamMember.introduction}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Team Member"}
          </button>
        </form>
      )}

      <div className="team-list mt-6">
        <h2>Team Members</h2>
        <ul>
          {teamData.map((teamMember) => (
            <li key={teamMember._id} className="flex items-center">
              <img
                src={teamMember.imageTeam}
                alt={teamMember.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3>{teamMember.name}</h3>
                <p>{teamMember.language}</p>
                <p>{teamMember.experience}</p>
                <p>{teamMember.introduction}</p> {/* Display introduction */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
