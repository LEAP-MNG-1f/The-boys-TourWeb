import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const SpecialComponents = ({ handleChange, formData }) => {
  return (
    <div>
      <h1> Where would you like to go *</h1>
      <input
        type="text"
        id="user_location"
        name="user_location"
        value={formData.user_location}
        onChange={handleChange}
        className="block w-full mt-5 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
        required
      />
      <h1 className="mt-5"> When would you like to go</h1>
      <input
        type="date"
        id="user_date"
        name="user_date"
        value={formData.user_date}
        onChange={handleChange}
        className="block w-full mt-5 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
        required
      />
      <h1 className="mt-5"> For how long (Minimum 5 nights) *</h1>
      <input
        type="text"
        id="user_duration"
        name="user_duration"
        value={formData.user_duration}
        onChange={handleChange}
        placeholder="7 nights, or 2 weeks"
        className="block w-full mt-5 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
        required
      />
      <h1 className="mt-10 text-[22px] font-bold">
        Your group and travel plans
      </h1>
      <h1 className="mt-5">
        How many traveling in your group? (Minimum 4 people) *
      </h1>
      <input
        type="number"
        id="user_groupSize"
        name="user_groupSize"
        value={formData.user_groupSize}
        onChange={handleChange}
        min="1"
        className="block w-full mt-5 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
        required
      />
      <h1 className="mt-5">
        Our Tailor_made trips are customised private departures Centerally,
        unless you have 6 or more people in your group idestination depentaly,
        price will be higher than our standard tours but the experience is will
        worth it
      </h1>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.user_travelingWithChildren}
              onChange={handleChange}
              name="user_travelingWithChildren"
            />
          }
          label="I am traveling with children under 18"
        />
      </FormGroup>
    </div>
  );
};
