"use client";

export default function Special() {
  return (
    <div>
      <div className="flex justify-center pt-20">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Where would you like to go *
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
              <input
                type="text"
                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
