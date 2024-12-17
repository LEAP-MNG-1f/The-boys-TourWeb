import { v2 as cloudinary } from "cloudinary";
import { TeamModels } from "../models/TeamModels.js";

const getAllTeams = async (request, response) => {
  const result = await TeamModels.find();
  response.json(result);
};

const createTeams = async (request, response) => {
  try {
    const { name, intoduction, imageTeam, languege, exprience } = request.body;

    let imageUrlteam = "";
    if (request.file) {
      // Change from request.files to request.file
      const uploadResult = await cloudinary.uploader.upload(request.file.path, {
        folder: "teams",
        resource_type: "auto",
      });
      imageUrlteam = uploadResult.url;
    }

    const result = await TeamModels.create({
      imageTeam: imageUrlteam,
      name,
      intoduction,
      imageTeam,
      languege,
      exprience,
    });

    response.status(201).json({
      success: true,
      message: "Team created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ success: false, message: "Error creating event", error });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTeam = await TeamModels.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Delete not found or already deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team deleted successfully",
      data: deletedTeam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the team",
      error: error.message,
    });
  }
};

export { createTeams, getAllTeams, deleteTeam };
