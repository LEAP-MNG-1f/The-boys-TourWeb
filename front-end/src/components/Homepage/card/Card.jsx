export const Card = ({ image, price, description, additionalInfo }) => {
  return (
    <div className="w-[320px] h-[340px] relative group overflow-hidden rounded-[24px] shadow-lg">
      <img
        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        src={image}
        alt={description}
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white z-20">
        <h1 className="text-lg font-semibold">{description}</h1>
        <div className="flex items-center gap-4 mt-2">
          <h1 className="text-xl font-bold">{price}$</h1>
          <button className="border border-white text-white rounded-lg py-1 px-4 hover:bg-white hover:text-black transition-all duration-300">
            Book now
          </button>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4 z-10 pointer-events-none">
        <h1 className="text-white text-lg font-semibold mb-2">{description}</h1>
        <p className="text-gray-300 text-sm text-center">{additionalInfo}</p>
      </div>
    </div>
  );
};
