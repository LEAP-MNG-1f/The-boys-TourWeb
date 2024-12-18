import { viewModels } from "../models/ViewModels.js";

const getAllView = async (request, response) => {
  const result = await viewModels.find();
  response.json(result);
};

const deleteOldViews = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    await viewModels.updateMany(
      {},
      {
        $pull: {
          views: {
            date: { $lt: thirtyDaysAgo.toISOString().split("T")[0] },
          },
        },
      }
    );
  } catch (error) {
    console.error("Error deleting old views:", error);
  }
};

const createView = async (request, response) => {
  const { pageId } = request.body;

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD формат

  try {
    const pageView = await viewModels.findOne({ pageId });

    if (!pageView) {
      // Хэрэв хуудасны мэдээлэл байхгүй бол шинээр үүсгэнэ
      const newPageView = await viewModels.create({
        pageId,
        views: [{ date: today, count: 1 }],
      });
      return response.status(201).json({
        success: true,
        message: "Page view initialized",
        data: newPageView,
      });
    }

    // Өдрийн хандалтыг шалгах
    const todayView = pageView.views.find((view) => view.date === today);

    if (todayView) {
      // Тухайн өдрийн хандалтыг нэмэгдүүлэх
      todayView.count += 1;
    } else {
      // Шинэ өдөр үүсгэх
      pageView.views.push({ date: today, count: 1 });
    }

    // Өөрчлөлтийг хадгалах
    await pageView.save();

    response.status(200).json({
      success: true,
      message: "Page view updated",
      data: pageView,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Failed to increment view count",
      error: error.message,
    });
  }
};

export { getAllView, createView, deleteOldViews };
