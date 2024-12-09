import { v2 as cloudinary } from "cloudinary";
import { Itinerary } from "../models/TourModels.js";

const getAllTours = async (request, response) => {
  const result = await Itinerary.find();
  response.json({ success: true, data: result });
};

const createTour = async (request, response) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      price,
      location,
      dailyPlans,
    } = request.body;

    const file = request.file;

    if (!file) {
      return response
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    // Upload the file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "tours",
    });

    // Create a new tour document in the database
    const result = await Itinerary.create({
      title,
      image: uploadResult.url, // Save Cloudinary URL in database
      description,
      price,
      startDate,
      endDate,
      location,
      dailyPlans,
    });

    response.status(201).json({
      success: true,
      message: "Tour created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ success: false, message: "Error creating tour" });
  }
};

const updateFood = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, image, ingredient, price } = request.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid Food ID" });
    }

    const result = await Food.findByIdAndUpdate(
      id,
      { name, image, ingredient, price },
      { new: true, runValidators: true }
    );

    if (!result) {
      return response.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    response.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      message: "Error updating food",
    });
  }
};

const deleteFood = async (request, response) => {
  const { id } = request.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return response
      .status(400)
      .json({ success: false, message: "Invalid Food" });
  }
  const result = await Food.findByIdAndDelete(id);
  if (!result) {
    return response.status(404).json({
      success: false,
      message: "Food not found",
    });
  }
  response.json({ success: true, data: result });
};

export { createTour, getAllTours, updateFood, deleteFood };
