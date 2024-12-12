import { v2 as cloudinary } from "cloudinary";
import { Itinerary } from "../models/TourModels.js";

const getAllTours = async (request, response) => {
  const result = await Itinerary.find();
  response.json(result);
};

const getSingleTour = async (request, response) => {
  try {
    const { title } = request.params;
    const result = await Itinerary.findOne({ title });

    if (!result) {
      return response
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }
    response.json(result);
  } catch (error) {
    response
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
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

export { createTour, getAllTours, getSingleTour };
