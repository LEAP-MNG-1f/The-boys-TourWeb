export const HowMuchWould = ({ handleChange, formData }) => {
  return (
    <div>
      <h1 className="font-bold text-[22px] mt-10">
        How much would you like to spend per person?
      </h1>
      <input
        type="text"
        id="user_budget"
        name="user_budget"
        min="50"
        className="block w-full mt-5 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
      />
      <h1 className="font-bold text-[22px] mt-10">
        Tell us about your travel plans
      </h1>
      intrepid Tailor-Made trips include an elment of touring if you are looking
      for just a hotel and transfer or an all-inclusive resort package, then we
      recommend reching out to a local travel agent, if you are looking to get
      to know the destination, meeting locals, and maybe try new food- we got
      you covered*
      <textarea
        name="message"
        rows={2}
        value={formData.message}
        onChange={handleChange}
        placeholder="Any must-haves in your ideal itinerary, your preferred style of accommodation, any special interests of your group..."
        className="form-control mt-5 border border-gray-600 w-full"
        style={{ height: "93px" }}
      ></textarea>
    </div>
  );
};
