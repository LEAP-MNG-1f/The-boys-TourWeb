import { CategoryModels } from "../models/CategoryModels.js";

const createCategory = (req, res) => {
  const result = CategoryModels.create({
    name: "autumn",
    imageCategory:
      "https://res-console.cloudinary.com/dmsyul4sr/thumbnails/v1/image/upload/v1733897404/YXV0dW1uX2hqYmtqcA==/drilldown",
    intoduction: "autumn is good",
  });
  res.json({
    success: true,
    data: result,
  });
};

const getAllCategory = async (req, res) => {
  const result = await CategoryModels.find();
  res.json({
    success: true,
    data: result,
  });
};

export { createCategory, getAllCategory };
