import Link from "next/link";
export const HeaderPart = () => {
  return (
    <div className="fixed w-full top-0 z-50 backdrop-blur-sm bg-black/40">
      <header className="py-6 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href={"/"}>
            <div className="text-white text-2xl font-bold tracking-wide">
              LOGO
            </div>
          </Link>

          <nav className="hidden md:flex gap-8">
            <Link href={"/"}>
              <h1 className="text-white text-lg font-medium hover:text-orange-500 transition duration-300">
                Mongolian Tour
              </h1>
            </Link>
            <Link href={"/special-order"}>
              <h1 className="text-white text-lg font-medium hover:text-orange-500 transition duration-300">
                Create Your Tour
              </h1>
            </Link>
            <Link href={"/"}>
              <h1 className="text-white text-lg font-medium hover:text-orange-500 transition duration-300">
                Mongolian Guest
              </h1>
            </Link>
            <Link href={"/about-us"}>
              <h1 className="text-white text-lg font-medium hover:text-orange-500 transition duration-300">
                About Us
              </h1>
            </Link>
          </nav>

          <div className="md:hidden">
            <button
              className="text-white text-2xl focus:outline-none"
              aria-label="Open Menu"
            >
              ☰
            </button>
            <div></div>
          </div>
        </div>
      </header>
    </div>
  );
};
