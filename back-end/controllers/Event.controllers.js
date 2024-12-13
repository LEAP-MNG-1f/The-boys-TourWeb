import { v2 as cloudinary } from "cloudinary";
import { EventModels } from "../models/EventModels.js";

const getAllEvent = async (request, response) => {
  const result = await EventModels.find().populate("categoryId");
  response.json(result);
};

const createEvent = async (request, response) => {
  try {
    const { name, imageEvent, intoduction, season, date, categoryId } =
      request.body;

    const files = request.files;

    if (!files || files.length === 0) {
      return response
        .status(400)
        .json({ success: false, message: "Images error" });
    }

    // Upload images to Cloudinary
    const uploadResults = await Promise.all(
      files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: "events" })
      )
    );

    const imageUrls = uploadResults.map((result) => result.url);

    // Save data to MongoDB
    const result = await EventModels.create({
      name,
      imageEvent,
      intoduction,
      season,
      date,
      categoryId,
    });

    response.status(201).json({
      success: true,
      message: "Event created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ success: false, message: "Error creating event", error });
  }
};

export { createEvent, getAllEvent };
