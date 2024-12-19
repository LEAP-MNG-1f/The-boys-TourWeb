import React from "react";

export const ConfirmDeletion = ({ setDeleteEventId, handleDeleteEvent }) => {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="modal-box bg-[#182237] w-full max-w-md rounded-lg">
          <h3 className="font-bold text-lg mb-4">Confirm Deletion</h3>
          <p className="py-4 text-white">
            Are you sure you want to delete this event?
          </p>
          <div className="modal-action flex justify-end space-x-2">
            <button
              className="btn btn-ghost text-white"
              onClick={() => setDeleteEventId(null)}
            >
              Cancel
            </button>
            <button className="btn btn-error" onClick={handleDeleteEvent}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
