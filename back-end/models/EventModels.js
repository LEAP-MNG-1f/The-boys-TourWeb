import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageEvent: {
    type: String,
  },
  introduction: {
    type: String,
  },
  season: {
    type: String,
  },
  date: {
    type: String,
  },
  categoryId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
});

export const EventModels = mongoose.model("Event", eventSchema);
