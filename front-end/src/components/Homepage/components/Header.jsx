export const HeaderPart = () => {
  return (
    <div className="pb-[40px] fixed w-full top-0 z-50">
      <header className="bg-gray-800 py-8 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-white text-2xl font-bold tracking-wide">
            LOGO
          </div>

          <nav className="hidden md:flex gap-8">
            <a
              href="#"
              className="text-white text-lg font-medium hover:text-orange-500 transition duration-300"
            >
              Mongolian Tour
            </a>
            <a
              href="#"
              className="text-white text-lg font-medium hover:text-orange-500 transition duration-300"
            >
              Create Your Tour
            </a>
            <a
              href="#"
              className="text-white text-lg font-medium hover:text-orange-500 transition duration-300"
            >
              Mongolian Guest
            </a>
            <a
              href="#"
              className="text-white text-lg font-medium hover:text-orange-500 transition duration-300"
            >
              About Us
            </a>
          </nav>

          <div className="md:hidden">
            <button
              className="text-white text-2xl focus:outline-none"
              aria-label="Open Menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};
