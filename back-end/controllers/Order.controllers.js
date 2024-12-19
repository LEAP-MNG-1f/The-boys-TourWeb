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

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await OrderModels.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found or already deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "order deleted successfully",
      data: deletedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the order",
      error: error.message,
    });
  }
};

export { createOrder, getAllOrders, deleteOrder };
