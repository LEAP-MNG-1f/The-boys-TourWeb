import { v2 as cloudinary } from "cloudinary";
import { CategoryModels } from "../models/CategoryModels.js";

const createCategory = async (req, res) => {
  try {
    const { name, introduction } = req.body;
    const file = req.file;

    // Зураг upload хийх
    let imageUrl = "";
    if (file) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "categories", // Cloudinary дээрх folder
        resource_type: "auto",
      });
      imageUrl = uploadResult.url;
    }

    // Category үүсгэх
    const result = await CategoryModels.create({
      name,
      imageCategory: imageUrl,
      introduction,
      tourId,
    });

    res.status(201).json({
      success: true,
      message: "Category амжилттай үүсгэгдлээ",
      data: result,
    });
  } catch (error) {
    console.error("Category үүсгэхэд алдаа гарлаа:", error);
    res.status(500).json({
      success: false,
      message: "Category үүсгэхэд алдаа гарлаа",
      error: error.message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModels.find();

    if (!categories || categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }

    res.status(200).json({
      success: true,
      data: categories,
      message: `${categories.length} categories retrieved successfully.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching categories",
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await CategoryModels.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found or already deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the category",
      error: error.message,
    });
  }
};

export { createCategory, getAllCategory, deleteCategory };
