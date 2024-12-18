import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageTeam: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
  },
  language: {
    type: String,
  },
  experience: {
    type: String,
  },
});

export const TeamModels = mongoose.model("Team", teamSchema);
