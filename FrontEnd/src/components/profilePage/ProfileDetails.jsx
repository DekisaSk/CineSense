import { TextField, Button } from "@mui/material";

const ProfileDetails = ({ userData, onInputChange, onSaveProfile }) => {
  return (
    <form className="flex flex-col gap-4 mt-4 w-full">
      <TextField
        label="First Name"
        variant="outlined"
        required
        value={userData.firstName}
        onChange={(event) => onInputChange("firstName", event.target.value)}
      />

      <TextField
        label="Last Name"
        variant="outlined"
        required
        value={userData.lastName}
        onChange={(event) => onInputChange("lastName", event.target.value)}
      />

      <TextField
        label="Email"
        variant="outlined"
        type="email"
        required
        value={userData.email}
        onChange={(event) => onInputChange("email", event.target.value)}
      />

      <Button variant="contained" color="primary" onClick={onSaveProfile}>
        Save Changes
      </Button>
    </form>
  );
};

export default ProfileDetails;
