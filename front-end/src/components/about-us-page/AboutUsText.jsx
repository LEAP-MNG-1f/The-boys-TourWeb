// "use client";
// import { useState } from "react";
// import ViewAllPicture from "../viewallpage/components/ViewAllPicture";

// const AboutUsText = () => {
//   const [activeTab, setActiveTab] = useState("Company");

//   const tabItems = [
//     { text: "Company", isBold: true },
//     { text: "Our Team", isBold: false },
//   ];

//   const companyDescriptions = [
//     {
//       title: "Our Mission",
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//     },
//     {
//       title: "Our Vision",
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//     },
//     {
//       title: "Our Values",
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//     },
//   ];

//   return (
//     <div className="w-full min-h-screen px-[100px] py-[50px] mt-[100px] bg-gray-50">
//       <div className="container mx-auto">
//         <div className="flex justify-end mb-10 space-x-6">
//           {tabItems.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveTab(item.text)}
//               className={`
//                 text-lg
//                 font-semibold
//                 transition-all
//                 duration-300
//                 ease-in-out
//                 ${
//                   activeTab === item.text
//                     ? "text-[#FC8233] underline"
//                     : "text-gray-600 hover:text-[#FC8233]"
//                 }
//                 hover:scale-105
//               `}
//             >
//               {item.text}
//             </button>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//           {companyDescriptions.map((section, index) => (
//             <div
//               key={index}
//               className="bg-white p-6 rounded-xl  shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <h3 className="text-xl font-bold text-[#FC8233] mb-4">
//                 {section.title}
//               </h3>
//               <p className="text-gray-700 leading-relaxed">
//                 {section.description}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="relative group overflow-hidden rounded-2xl shadow-lg max-w-4xl mx-auto transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
//           <img
//             src="https://www.stepperiders.mn/public/storage/scJB23uf9SGsD1kzSparTueVnLzkzgRlOM2pyJVM.jpg"
//             alt="Stepper Riders"
//             className="w-full h-auto object-cover transition-transform duration-300 group-hover:brightness-90"
//           />
//           <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
//         </div>

//         <div className="mt-16 bg-white p-8 rounded-xl shadow-md">
//           <h2 className="text-2xl font-bold text-[#FC8233] mb-6">Our Story</h2>
//           <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry's standard dummy text
//             ever since the 1500s, when an unknown printer took a galley of type
//             and scrambled it to make a type specimen book. It has survived not
//             only five centuries, but also the leap into electronic typesetting,
//             remaining essentially unchanged.
//           </p>
//         </div>
//         <div className="relative group overflow-hidden rounded-2xl shadow-lg max-w-4xl mx-auto transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl mt-16">
//           <img
//             src="https://www.stepperiders.mn/public/storage/scJB23uf9SGsD1kzSparTueVnLzkzgRlOM2pyJVM.jpg"
//             alt="Stepper Riders"
//             className="w-full h-auto object-cover transition-transform duration-300 group-hover:brightness-90"
//           />
//           <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUsText;
"use client";
import { useState } from "react";
import ViewAllPicture from "../viewallpage/components/ViewAllPicture";

const AboutUsText = () => {
  const [activeTab, setActiveTab] = useState("Company");

  const tabItems = [
    { text: "Company", isBold: true },
    { text: "Our Team", isBold: false },
  ];

  const companyDescriptions = [
    {
      title: "Our Mission",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      title: "Our Vision",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      title: "Our Values",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];

  return (
    <div className="w-full min-h-screen px-[100px] py-[50px] mt-[100px] bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-end mb-10 space-x-6">
          {tabItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(item.text)}
              className={`
                text-lg
                font-semibold
                transition-all
                duration-300
                ease-in-out
                ${
                  activeTab === item.text
                    ? "text-[#FC8233] underline"
                    : "text-gray-600 hover:text-[#FC8233]"
                }
                hover:scale-105
              `}
            >
              {item.text}
            </button>
          ))}
        </div>

        {activeTab === "Company" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {companyDescriptions.map((section, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-bold text-[#FC8233] mb-4">
                    {section.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="relative group overflow-hidden rounded-2xl shadow-lg max-w-4xl mx-auto transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <img
                src="https://www.stepperiders.mn/public/storage/scJB23uf9SGsD1kzSparTueVnLzkzgRlOM2pyJVM.jpg"
                alt="Stepper Riders"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:brightness-90"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          </>
        )}

        {activeTab === "Our Team" && (
          <div className="text-center">
            <div className="mt-16 bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-[#FC8233] mb-6">
                Our Story
              </h2>
              <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>

            <div className="relative group overflow-hidden rounded-2xl shadow-lg max-w-4xl mx-auto transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl mt-16">
              <img
                src="https://www.stepperiders.mn/public/storage/scJB23uf9SGsD1kzSparTueVnLzkzgRlOM2pyJVM.jpg"
                alt="Stepper Riders"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:brightness-90"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUsText;
