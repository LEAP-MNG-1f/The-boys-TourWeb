import { OrderModels } from "../models/OrderModels.js";

const createOrder = async (req, res) => {
  try {
    const {
      fullname,
      country,
      email,
      phone,
      startdate,
      enddate,
      totalamount,
      personNumber,
      questions,
      tourId,
    } = req.body;

    const result = await OrderModels.create({
      fullname,
      country,
      email,
      phone,
      startdate,
      enddate,
      totalamount,
      personNumber,
      questions,
      tourId,
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const result = await OrderModels.find().populate("tourId");
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createOrder, getAllOrders };
