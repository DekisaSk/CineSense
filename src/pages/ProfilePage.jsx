import { useState, useEffect } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";

import ProfileAvatar from "../components/profilePage/ProfileAvatar";
import ProfileDetails from "../components/profilePage/ProfileDetails";
import MovieCardContainer from "../components/MovieCardContainer";

// Dummy data until backend is implemented
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
    // dummy
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
    // axios.put("...", userData)
    alert(
      "Profile updated (dummy). New data: \n" +
        JSON.stringify(userData, null, 2)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: { xs: 2, md: 4 },
        pb: { xs: 2, md: 4 },
      }}
    >
      <Container
        disableGutters
        sx={{
          px: { xs: 2, md: 2 },
          maxWidth: { lg: "1200px" },
          margin: "0 auto",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
              >
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
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Favourites
            </Typography>

            <MovieCardContainer category="popular" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;
