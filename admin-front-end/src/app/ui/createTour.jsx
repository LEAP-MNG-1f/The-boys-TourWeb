"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const CreateTourModal = (props) => {
  const [foodData, setFoodData] = useState({
    name: "",
    ingredient: "",
    price: "",
    categoryId: "",
    image: null,
  });

  console.log(process.env.NEXT_PUBLIC_BACK_END_POINT);

  const [categoryData, setCategoryData] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDataCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_POINT}/api/categories`
      );
      const data = await response.json();
      setCategoryData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFoodData({ ...foodData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", foodData.name);
    formData.append("ingredient", foodData.ingredient);
    formData.append("price", foodData.price);
    formData.append("categoryId", foodData.categoryId);
    if (foodData.image) {
      formData.append("image", foodData.image);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_POINT}/api/create-food`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.success) {
        props.setIsModalOpenFood(false);
        window.location.reload();
      } else {
        console.log("Error creating food");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // New function to handle clearing the form
  const handleClear = () => {
    setFoodData({
      name: "",
      ingredient: "",
      price: "",
      categoryId: "",
      image: null,
    });
    setImagePreview(null);

    // Reset file input
    const fileInput = document.getElementById("uploadFile1");
    if (fileInput) {
      fileInput.value = ""; // Clear the file input
    }
  };

  useEffect(() => {
    fetchDataCategory();
  }, []);

  return (
    <div
      id="popup-modal"
      className="fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-50"
    >
      <form onSubmit={handleSubmit}>
        <div className="relative flex flex-col w-[587px] h-max bg-white rounded-2xl justify-between">
          <div className="flex flex-col">
            <div className="flex justify-between px-6 py-4 items-center border-b">
              <p className="text-[#272727] text-2xl font-bold leading-normal">
                Create food
              </p>
              <button
                onClick={() => props.setIsModalOpenFood(false)}
                className="flex items-center"
                type="button"
              >
                <X />
              </button>
            </div>
            <div className="flex flex-col px-6 py-6 gap-4">
              <div className="flex flex-col w-full h-auto gap-2">
                <p className="text-[#121316] text-sm font-normal leading-5">
                  Хоолны нэр
                </p>
                <input
                  type="text"
                  value={foodData.name}
                  onChange={(e) =>
                    setFoodData({ ...foodData, name: e.target.value })
                  }
                  className="h-14 bg-[#F4F4F4] outline-none px-3 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col w-full h-auto gap-2">
                <p className="text-[#121316] text-sm font-normal leading-5">
                  Хоолны ангилал
                </p>

                <select
                  className="h-14 bg-[#F4F4F4] outline-none px-3 rounded-lg"
                  onChange={(e) =>
                    setFoodData({ ...foodData, categoryId: e.target.value })
                  }
                  value={foodData.categoryId}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categoryData.map((cate) => (
                    <option key={cate._id} value={cate._id}>
                      {cate.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full h-auto gap-2">
                <p className="text-[#121316] text-sm font-normal leading-5">
                  Хоолны орц
                </p>
                <input
                  type="text"
                  value={foodData.ingredient}
                  onChange={(e) =>
                    setFoodData({ ...foodData, ingredient: e.target.value })
                  }
                  className="h-14 bg-[#F4F4F4] outline-none px-3 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col w-full h-auto gap-2">
                <p className="text-[#121316] text-sm font-normal leading-5">
                  Хоолны үнэ
                </p>
                <input
                  type="number"
                  value={foodData.price}
                  onChange={(e) =>
                    setFoodData({ ...foodData, price: e.target.value })
                  }
                  className="h-14 bg-[#F4F4F4] outline-none px-3 rounded-lg"
                  required
                />
              </div>

              <div className="flex flex-col w-full h-auto gap-2">
                <p className="text-[#121316] text-sm font-normal leading-5">
                  Хоолны зураг
                </p>
                <div className="flex flex-col w-[284px] h-auto p-2 gap-2 justify-center items-center border border-dashed rounded-lg bg-[rgba(186,188,196,0.12)]">
                  <p className="text-[#525252] text-base font-bold leading-6">
                    Add image for the food
                  </p>
                  <input
                    type="file"
                    id="uploadFile1"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="uploadFile1"
                    className="flex items-center justify-center w-[144px] text-[#FFFFFF] bg-[#393939] text-base font-bold leading-6 px-3 py-2 rounded-lg cursor-pointer"
                  >
                    Add image
                  </label>

                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Food Preview"
                        className="w-full h-[200px] object-contain border border-red-300 border-dashed p-2"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-end p-6">
            <div className="flex gap-5">
              <button
                type="button"
                onClick={handleClear}
                className="text-base font-bold leading-5 text-[#393939] px-4 py-[10px] rounded-md hover:bg-gray-100"
              >
                Clear
              </button>
              <button
                type="submit"
                className="bg-[#393939] text-base font-bold leading-5 text-[#ffffff] px-4 py-[10px] rounded-md"
                disabled={loading}
              >
                {loading ? "Loading..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTourModal;
