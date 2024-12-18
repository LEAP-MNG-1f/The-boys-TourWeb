import { motion } from "framer-motion";
export const CompanyDescriptionsGrid = ({ companyDescriptions }) => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {companyDescriptions.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            className="group"
          >
            <div className="bg-white p-4 sm:p-6 rounded-2xl min-h-[300px] flex flex-col justify-between border border-gray-100 shadow-lg hover:shadow-2xl hover:border-[#FC8233]/20 transition-all duration-300 transform hover:-translate-y-2 space-y-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FC8233]/10 rounded-full flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-[#FC8233]/20 transition-colors duration-300">
                  <span className="text-[#FC8233] text-xl sm:text-2xl font-bold">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-[#FC8233] transition-colors">
                  {section.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                {section.description}
              </p>
              <div className="h-1 w-full bg-[#FC8233]/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#FC8233] w-0 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
