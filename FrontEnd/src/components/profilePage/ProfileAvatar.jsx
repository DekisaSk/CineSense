import { Avatar, Button } from "@mui/material";

const ProfileAvatar = ({ avatarSrc, onAvatarChange }) => {
  return (
    <div className="flex flex-col items-center mb-4">
      <Avatar
        alt="User Avatar"
        src={avatarSrc}
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Button variant="contained" component="label">
        Change Avatar
        <input hidden accept="image/*" type="file" onChange={onAvatarChange} />
      </Button>
    </div>
  );
};

export default ProfileAvatar;
