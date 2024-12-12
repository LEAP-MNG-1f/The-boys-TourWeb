import { AdminModels } from "../models/AdminModels.js";

const getAllAdmin = async (req, res) => {
  const result = await AdminModels.find();
  res.json({
    success: true,
    data: result,
  });
};

export { getAllAdmin };
