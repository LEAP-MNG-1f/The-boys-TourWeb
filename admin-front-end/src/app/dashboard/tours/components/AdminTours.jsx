"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const GobiTourInfo = () => {
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    imageCategory: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tourData, setTourData] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/categories");
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/tours");
        const data = await response.json();
        setTourData(data.data);
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }
    };

    fetchTourData();
    fetchCategories();
  }, []);

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

    try {
      const response = await fetch("http://localhost:8000/api/categories", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Category created successfully");
        fetchCategories();
        handleClose();
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="pt-[50px] w-full">
      <div className="flex gap-6 pt-6 justify-start pb-[30px]">
        <Button variant="outlined" onClick={handleClickOpen}>
          + Create New Category
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">Create New Category</DialogTitle>
          <form onSubmit={handleCreateCategory}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Category Name"
                fullWidth
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
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Create
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
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
      </div>

      <div className="w-[25%] bg-[#182237] shadow-lg rounded-lg overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          {tourData?.title || "Gobi Tour"}
        </h2>

        <div className="grid grid-cols-1 gap-4 mb-6">
          {(tourData?.images || []).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Tour Image ${index + 1}`}
              className="w-full h-40 object-cover rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GobiTourInfo;
