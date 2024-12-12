import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  startdate: {
    type: String,
    required: true,
  },
  enddate: {
    type: String,
    required: true,
  },
  totalamount: {
    type: String,
    required: true,
  },
  personNumber: {
    type: String,
    required: true,
  },
  questions: {
    type: String,
  },
  tourId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Itinerary",
  },
});

export const OrderModels = mongoose.model("Order", orderSchema);
