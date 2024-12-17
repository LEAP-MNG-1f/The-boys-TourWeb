import mongoose, { Schema } from "mongoose";

const itinerarySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    description: {
      type: String,
      default: "No description provided.",
    },
    serviceInclude: [{ type: String }],
    serviceNotInclude: [{ type: String }],
    images: [
      {
        type: String,
      },
    ],
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    categoryId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
    },
    price: [
      {
        pax: { type: String },
        perPerson: { type: String },
      },
    ],
    location: {
      type: String,
      trim: true,
    },
    dailyPlans: [
      {
        day: { type: String },
        dayTitle: { type: String },
        periodOfTime: [
          {
            when: {
              type: String,
            },
            notes: {
              type: String,
            },
          },
        ],
        activities: [
          {
            activityName: {
              type: String,
            },
            notes: {
              type: String,
            },
          },
        ],
        accommodation: [
          {
            accomName: {
              type: String,
            },
            notes: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const Itinerary = mongoose.model("Itinerary", itinerarySchema);
