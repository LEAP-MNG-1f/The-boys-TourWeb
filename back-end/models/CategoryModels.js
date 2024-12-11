import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageCategory: [
    {
      type: String,
    },
  ],
  intoduction: {
    type: String,
  },
});

export const Category = mongoose.model("Category", categorySchema);
