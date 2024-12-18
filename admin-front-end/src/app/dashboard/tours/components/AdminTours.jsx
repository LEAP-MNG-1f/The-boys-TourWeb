"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Trash2 } from "lucide-react";

const GobiTourInfo = () => {
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    imageCategory: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [tourData, setTourData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
      );
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/tours`
        );
        const data = await response.json();
        setTourData(data);
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }
    };

    fetchTourData();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tour? This action cannot be undone."
    );

    if (!confirmDelete) {
      return; // Exit if the user cancels the action
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tours/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the deleted tour from the state
        setTourData((prev) => prev.filter((tour) => tour._id !== id));
        alert("Tour deleted successfully!");
      } else {
        alert("Failed to delete the tour.");
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  const handleDeleteCate = async (id) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category? This action cannot be undone."
    );

    if (!confirmDelete) {
      return; // Exit if the user cancels the action
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the deleted tour from the state
        setCategories((prev) => prev.filter((cate) => cate._id !== id));
        alert("Category deleted successfully!");
      } else {
        alert("Failed to delete the tour.");
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewCategory({ name: "", imageCategory: "" });
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("imageCategory", newCategory.imageCategory);

    setLoading(true); // Start loading

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Category created successfully");
        fetchCategories(); // Refresh categories
        handleClose(); // Close the dialog
      } else {
        console.error("Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // bg - #1512c2
  // bgsoft - #182237
  // textsoft - #b7bac1

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex gap-6 pt-6 justify-start pb-[30px]">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle
            className="bg-[#182237] text-white"
            id="form-dialog-title"
          >
            Create New Category
          </DialogTitle>
          <form
            onSubmit={handleCreateCategory}
            className="bg-[#182237] text-white "
          >
            <DialogContent className="flex flex-col gap-4">
              <input
                className="input bg-[#151c2c] "
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewCategory((prev) => ({
                    ...prev,
                    imageCategory: e.target.files[0],
                  }))
                }
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} disabled={loading} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>

      {/* <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => setSelectedCategory(category.name)}
            className={`border-2 p-4 rounded-lg cursor-pointer transition duration-300 w-[200px] ${
              selectedCategory === category.name
                ? "bg-blue-500 text-white border-blue-500"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="text-center font-medium">{category.name}</div>
          </div>
        ))}
      </div> */}

      <div className="w-max bg-[#182237] flex flex-col shadow-lg rounded-lg overflow-hidden p-6">
        <h1>Categories</h1>
        <table className="table">
          {/* head */}
          <thead className="text-white">
            <tr>
              <th>Title</th>
              {/* <th>created at</th> */}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {categories.map((category) => (
              <tr key={category._id}>
                <th>{category.name}</th>
                {/* 
                <td className="px-4 py-2 text-sm">
                  {new Date(category.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Ulaanbaatar",
                  })}
                </td> */}

                <td>
                  <button onClick={() => handleDeleteCate(category._id)}>
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn " onClick={handleClickOpen}>
          + Create New Category
        </button>
      </div>

      <div className="max-w-[30vw] bg-[#182237] shadow-lg rounded-lg overflow-hidden p-6">
        <h1>Tours</h1>
        <table className="table">
          {/* head */}
          <thead className="text-white">
            <tr>
              <th></th>
              <th>Title</th>
              <th>created at</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {tourData.map((tour, index) => (
              <tr key={tour._id}>
                <th>{index + 1} </th>
                <td>{tour.title}</td>

                <td className="px-4 py-2 text-sm">
                  {new Date(tour.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Ulaanbaatar",
                  })}
                </td>

                <td>
                  <button onClick={() => handleDelete(tour._id)}>
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GobiTourInfo;
