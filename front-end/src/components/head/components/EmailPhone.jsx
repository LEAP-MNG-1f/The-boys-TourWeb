import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const EmailPhone = ({ formData, handleChange }) => {
  return (
    <div>
      <h1 className="mt-5">Email</h1>
      <input
        type="email"
        id="user_email"
        name="user_email"
        value={formData.user_email}
        onChange={handleChange}
        placeholder="Email*"
        className="block w-full mt-3 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
        required
      />
      <h1 className="mt-5">Phone</h1>
      <input
        type="tel"
        id="user_phone"
        name="user_phone"
        value={formData.user_phone}
        onChange={handleChange}
        placeholder="Phone*"
        className="block w-full mt-3 py-1.5 pl-1 border border-gray-400 rounded-lg text-gray-900 focus:outline-indigo-600"
        required
      />
      <FormGroup className="flex mt-10 gap-4">
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.user_contactViaEmail}
              onChange={handleChange}
              name="user_contactViaEmail"
            />
          }
          label="Email"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.user_receiveUpdates}
              onChange={handleChange}
              name="user_receiveUpdates"
            />
          }
          label="I accept that all details provided will be held and used in accordance with the intrepid Travel Privacy Statement"
        />
      </FormGroup>
      <FormGroup className="flex mt-7">
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.user_acceptPrivacy}
              onChange={handleChange}
              name="user_acceptPrivacy"
              required
            />
          }
          label="We'd love to contact you by email from time to time  about exciting travel news and products we think might interest you. Please tick this box if you are hapy to receive this"
        />
      </FormGroup>
    </div>
  );
};
