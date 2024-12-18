import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const IfYouHaveBeen = ({ handleChange, formData }) => {
  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.user_tailorExistingItinerary}
              onChange={handleChange}
              name="user_tailorExistingItinerary"
            />
          }
          label="I would like to tailor an existing itinerary"
        />
      </FormGroup>
      <h1 className="mt-5">
        If you have seen a trip you love the look of on our website, please let
        us know the name or website link. Alternatively, if you have your own
        itinerary feel free to upload this; your consultant can work with you
        and your group on a proposal.
      </h1>
      <h1 className="font-bold text-[22px] mt-8">Your contact details</h1>
      <h1 className="mt-3">Name(as per passpord)*</h1>
      <input
        type="text"
        id="user_name"
        name="user_name"
        value={formData.user_name}
        onChange={handleChange}
        placeholder="First Name*"
        className="block w-full mt-5 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
        required
      />
      <input
        type="text"
        id="lai"
        name="lai"
        value={formData.user_lai}
        onChange={handleChange}
        placeholder="Last Name*"
        className="block w-full mt-5 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
        required
      />
    </div>
  );
};
