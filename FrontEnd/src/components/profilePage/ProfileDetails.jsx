import { TextField, Button } from "@mui/material";
import { useEffect } from "react";

const ProfileDetails = ({
  userData,
  onInputChange,
  onSaveProfile,
  email,
  firstName,
  lastName,
  setEmail,
  setFirstName,
  setLastName,
}) => {
  useEffect(() => {
    setFirstName(userData.name);
    setLastName(userData.last_name);
    setEmail(userData.email);
  }, [userData, setFirstName, setLastName, setEmail]);

  return (
    <form className="flex flex-col gap-4 mt-4 w-full">
      <TextField
        label="First Name"
        variant="outlined"
        required
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />

      <TextField
        label="Last Name"
        variant="outlined"
        required
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />

      <TextField
        label="Email"
        variant="outlined"
        type="email"
        required
        value={userData.email}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => onSaveProfile(firstName, lastName, email)}
      >
        Save Changes
      </Button>
    </form>
  );
};

export default ProfileDetails;
