import React from "react";

const PriceSection = ({
  price,
  handlePriceChange,
  handleRemovePrice,
  handleAddPrice,
}) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-white mb-4">Price Details</h3>
      <div className="flex flex-col gap-4">
        {price.map((p, index) => (
          <div
            key={index}
            className="price-item flex items-center gap-4 bg-[#2C3E50] p-4 rounded-md"
          >
            <label className="flex-1">
              Pax
              <input
                type="number"
                value={p.pax}
                onChange={(e) =>
                  handlePriceChange(index, "pax", e.target.value)
                }
                required
                className="mt-1 block w-full bg-[#182237] border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="flex-1">
              Per Person Price
              <input
                type="number"
                value={p.perPerson}
                onChange={(e) =>
                  handlePriceChange(index, "perPerson", e.target.value)
                }
                required
                className="mt-1 block w-full bg-[#182237] border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <button
              type="button"
              className="btn btn-delete bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 transition-colors"
              onClick={() => handleRemovePrice(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="btn mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
        onClick={handleAddPrice}
      >
        Add Price
      </button>
    </div>
  );
};

export default PriceSection;
