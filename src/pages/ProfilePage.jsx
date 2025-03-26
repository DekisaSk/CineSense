import { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";

import ProfileAvatar from "../components/profilePage/ProfileAvatar";
import ProfileDetails from "../components/profilePage/ProfileDetails";

// dummy data dok se ne odradi backend
const initialUserData = {
  firstName: "Pavle",
  lastName: "Dzuverovic",
  email: "pdzuverovic@gmail.com",
  avatar: "../assets/dummy.jpg",
};

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    // naknadno fetching
    setUserData(initialUserData);
  }, []);

  const handleInputChange = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = () => {
    //axios.put("...", userData)
    alert(
      "Profile updated (dummy). New data: \n" +
        JSON.stringify(userData, null, 2)
    );
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Paper
        elevation={4}
        className="p-8 w-full max-w-md flex flex-col items-center"
      >
        <Typography variant="h4" className="mb-4 text-center font-bold">
          Your Profile
        </Typography>

        <ProfileAvatar
          avatarSrc={userData.avatar}
          onAvatarChange={handleAvatarChange}
        />

        <ProfileDetails
          userData={userData}
          onInputChange={handleInputChange}
          onSaveProfile={handleUpdateProfile}
        />
      </Paper>
    </div>
  );
};

export default ProfilePage;
