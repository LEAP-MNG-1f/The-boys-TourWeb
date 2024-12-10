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
    images: [
      {
        type: String,
      },
    ],
    startDate: {
      type: Date,
      required: [true, "Start date is required."],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required."],
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "End date must be after the start date.",
      },
    },
    price: {
      type: String, // Use "Number" if the value is purely numeric.
      required: [true, "Price is required."],
    },
    location: {
      type: String,
      trim: true,
    },
    dailyPlans: [
      {
        day: {
          type: String,
        },
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
