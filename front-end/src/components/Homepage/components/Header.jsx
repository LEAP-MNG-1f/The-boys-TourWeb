export const HeaderPart = () => {
  return (
    <div>
      <nav className="py-4 px-8">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <button className="text-2xl font-extrabold text-blue-700 hover:text-[#FC8233] transition-colors duration-300">
              LOGO
            </button>
          </div>
          <div className="flex space-x-6">
            {[
              { text: "Mongolian tour", isBold: true },
              { text: "Create own special tour", isBold: false },
              { text: "Mongolian guest", isBold: false },
              { text: "About us", isBold: false },
            ].map((item, index) => (
              <button
                key={index}
                className={`
                text-gray-800 
                hover:text-[#FC8233] 
                font-semibold
                hover:underline 
                transition-all 
                duration-300 
                ease-in-out 
                transform 
                hover:scale-105
              `}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};
