import React from "react";

const GobiTourInfo = () => {
  const name = "Sengee";
  const email = "senge@gmail.com";
  const tourTitle = "Gobi Tour";

  const tourImages = [
    "https://news.mn/en/wp-content/uploads/sites/3/2021/08/2.jpg",
  ];

  const tourPrices = [
    {
      pax: "2",
      perPerson: "1690",
      _id: "6759075d45c04475e156cdb9",
    },
    {
      pax: "3",
      perPerson: "1390",
      _id: "6759075d45c04475e156cdba",
    },
    {
      pax: "4",
      perPerson: "1355",
      _id: "6759075d45c04475e156cdbb",
    },
  ];

  return (
    <div className="pt-[50px] w-full ">
      <div className="w-[25%] bg-[#182237] shadow-lg rounded-lg overflow-hidden p-6 ">
        <h2 className="text-2xl font-bold text-white mb-4">{tourTitle}</h2>

        <div className="grid grid-cols-1 gap-4 mb-6">
          {tourImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Tour Image ${index + 1}`}
              className="w-full h-40 object-cover rounded-md"
            />
          ))}
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold text-white w-20">Name:</span>
            <span className="text-white">{name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-white w-20">Email:</span>
            <span className="text-blue-600">{email}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white my-4">Pricing</h3>

        <table className="w-full mb-4">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 text-white">Group Size</th>
              <th className="text-right py-2 text-white">Price Per Person</th>
            </tr>
          </thead>
          <tbody>
            {tourPrices.map((price) => (
              <tr key={price._id} className="border-b last:border-b-0">
                <td className="py-2 text-white">{price.pax} people</td>
                <td className="py-2 text-right font-medium text-blue-600">
                  ${price.perPerson}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-sm text-white italic">
          * Prices are subject to change
        </p>
      </div>
    </div>
  );
};

export default GobiTourInfo;
