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
      categoryId,
      serviceInclude,
      serviceNotInclude,
    } = request.body;

    // Parse stringified JSON fields
    const parsedDailyPlans = JSON.parse(dailyPlans);
    const parsedPrice = JSON.parse(price);
    const parsedServiceInclude = JSON.parse(serviceInclude);
    const parsedServiceNotInclude = JSON.parse(serviceNotInclude);

    const files = request.files;

    if (!files || files.length === 0) {
      return response
        .status(400)
        .json({ success: false, message: "Images are required" });
    }

    // Upload images to Cloudinary
    const uploadResults = await Promise.all(
      files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: "tours" })
      )
    );

    const imageUrls = uploadResults.map((result) => result.url);

    // Save data to MongoDB
    const result = await Itinerary.create({
      title,
      description,
      images: imageUrls,
      startDate,
      endDate,
      categoryId,
      price: parsedPrice,
      location,
      dailyPlans: parsedDailyPlans,
      serviceInclude: parsedServiceInclude,
      serviceNotInclude: parsedServiceNotInclude,
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
      .json({ success: false, message: "Error creating tour", error });
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

export { createTour, getAllTours };
