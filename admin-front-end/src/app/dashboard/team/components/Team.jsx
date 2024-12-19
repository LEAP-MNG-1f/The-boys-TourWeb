"use client";
import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "./Dialog";
import { TeamMember } from "./TeamMember";

export const TeamPage = () => {
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    imageTeam: "",
    language: "",
    experience: "",
    introduction: "",
  });

  const [teamData, setTeamData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/teams`
        );
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
        language: "",
        experience: "",
        introduction: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/teams`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTeamMember),
        }
      );

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/teams/${id}`,
        {
          method: "DELETE",
        }
      );
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
      <Dialog
        modalRef={modalRef}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        newTeamMember={newTeamMember}
        handleChange={handleChange}
        isSubmitting={isSubmitting}
      />
      <div className="mt-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Team Members</h2>
        {teamData.length === 0 ? (
          <p className="text-center text-[25px] text-red-500 ">0 Members</p>
        ) : (
          <TeamMember teamData={teamData} handleDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};
