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
  const result = await CategoryModels.find();
  res.json({
    success: true,
    data: result,
  });
};

export { createCategory, getAllCategory };
