import { v2 as cloudinary } from "cloudinary";
import { EventModels } from "../models/EventModels.js";

const getAllEvent = async (request, response) => {
  const result = await EventModels.find().populate("categoryId");
  response.json(result);
};

const createEvent = async (request, response) => {
  try {
    const { name, intoduction, season, date, categoryId } = request.body;

    let imageUrlevent = "";
    if (request.file) {
      // Change from request.files to request.file
      const uploadResult = await cloudinary.uploader.upload(request.file.path, {
        folder: "events",
        resource_type: "auto",
      });
      imageUrlevent = uploadResult.url;
    }

    // Save data to MongoDB
    const result = await EventModels.create({
      name,
      imageEvent: imageUrlevent,
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
