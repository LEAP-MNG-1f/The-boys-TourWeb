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
  tourId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Itinerary",
  },
});

export const CategoryModels = mongoose.model("Category", categorySchema);
