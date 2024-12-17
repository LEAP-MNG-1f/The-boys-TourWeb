import mongoose from "mongoose";

const viewSchema = new mongoose.Schema({
  pageId: { type: String, required: true, unique: true },
  views: [
    {
      date: { type: String, required: true }, // YYYY-MM-DD форматтай огноо
      count: { type: Number, default: 1 }, // Тухайн өдрийн хандалтын тоо
    },
  ],
});

export const viewModels = mongoose.model("PageView", viewSchema);
