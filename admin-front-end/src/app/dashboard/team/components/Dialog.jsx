import React from "react";

export const Dialog = ({
  modalRef,
  closeModal,
  handleSubmit,
  newTeamMember,
  handleChange,
  isSubmitting,
}) => {
  return (
    <div>
      <dialog ref={modalRef} className="modal modal-middle sm:modal-middle">
        <div className="modal-box bg-[#151c2c] w-11/12 max-w-2xl">
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
              <label className="form-control  w-full">
                <div className="label">
                  <span className="label-text text-white ">Name</span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={newTeamMember.name}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-[#182237] "
                  required
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">Image URL</span>
                </div>
                <input
                  type="text"
                  name="imageTeam"
                  value={newTeamMember.imageTeam}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-[#182237]"
                  required
                />
              </label>

              <label className="form-control w-full">
                <div className="label ">
                  <span className="label-text text-white">Languages</span>
                </div>
                <input
                  type="text"
                  name="language"
                  value={newTeamMember.language}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-[#182237]"
                  required
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">Experience</span>
                </div>
                <input
                  type="text"
                  name="experience"
                  value={newTeamMember.experience}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-[#182237] "
                  required
                />
              </label>

              <label className="form-control w-full md:col-span-2">
                <div className="label">
                  <span className="label-text text-white">Introduction</span>
                </div>
                <textarea
                  name="introduction"
                  value={newTeamMember.introduction}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full h-24 bg-[#182237]"
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
    </div>
  );
};
