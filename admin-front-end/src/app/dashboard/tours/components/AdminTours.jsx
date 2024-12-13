"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const GobiTourInfo = () => {
  const [open, setOpen] = React.useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const [selectedSeason, setSelectedSeason] = useState(null);
  const [tourData, setTourData] = useState(null);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/tours");
        const data = await response.json();
        setTourData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTourData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form when closing
    setNewCategory({ name: "", description: "" });
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        // Handle successful category creation
        console.log("Category created successfully");
        handleClose();
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const name = tourData?.name || "Sengee";
  const email = tourData?.email || "senge@gmail.com";
  const tourTitle = tourData?.title || "Gobi Tour";

  const tourImages = tourData?.images || [
    "https://news.mn/en/wp-content/uploads/sites/3/2021/08/2.jpg",
  ];

  const tourPrices = tourData?.prices || [
    {
      pax: "2",
      perPerson: "1690",
      _id: "6759075d45c04475e156cdb9",
    },
    {
      pax: "3",
      perPerson: "1390",
      _id: "6759075d45c04475e156cdba",
    },
    {
      pax: "4",
      perPerson: "1355",
      _id: "6759075d45c04475e156cdbb",
    },
  ];

  return (
    <div className="pt-[50px] w-full">
      <div className="pt-[50px] w-full ">
        <div className="flex gap-6 pt-6 justify-start pb-[30px] ">
          <Button variant="outlined" onClick={handleClickOpen}>
            + Create new category
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle id="form-dialog-title">
              Create New Category
            </DialogTitle>
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
                <TextField
                  margin="dense"
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
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

          {["Summer", "Autumn", "Winter", "Spring"].map((season) => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`border-2 text-gray-800 py-2 px-6 rounded-lg font-medium transition duration-300 ${
                selectedSeason === season
                  ? "bg-orange-500 text-white border-orange-500"
                  : "hover:bg-gray-100"
              }`}
            >
              {season}
            </button>
          ))}
        </div>
        <div className="w-[25%] bg-[#182237] shadow-lg rounded-lg overflow-hidden p-6 ">
          <h2 className="text-2xl font-bold text-white mb-4">{tourTitle}</h2>

          <div className="grid grid-cols-1 gap-4 mb-6">
            {tourImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Tour Image ${index + 1}`}
                className="w-full h-40 object-cover rounded-md"
              />
            ))}
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <span className="font-semibold text-white w-20">Name:</span>
              <span className="text-white">{name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-white w-20">Email:</span>
              <span className="text-blue-600">{email}</span>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white my-4">Pricing</h3>

          <table className="w-full mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-white">Group Size</th>
                <th className="text-right py-2 text-white">Price Per Person</th>
              </tr>
            </thead>
            <tbody>
              {tourPrices.map((price) => (
                <tr key={price._id} className="border-b last:border-b-0">
                  <td className="py-2 text-white">{price.pax} people</td>
                  <td className="py-2 text-right font-medium text-blue-600">
                    ${price.perPerson}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GobiTourInfo;
