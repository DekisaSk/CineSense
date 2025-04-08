"use client";

import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import ProfileAvatar from "../components/profilePage/ProfileAvatar";
import ProfileDetails from "../components/profilePage/ProfileDetails";
import FavoritesContainer from "../components/FavoritesContainer";
import useProfile from "../hooks/useProfile";
import useCheckAuth from "../hooks/useCheckAuth";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "../hooks/useCheckRole";
import { useRoleContext } from "../contexts/RoleContext";

const ProfilePage = () => {
  const role = useUserRole();
  const { updateRole } = useRoleContext();
  useEffect(() => {
    if (role) {
      updateRole(role);
    }
  }, [role, updateRole]);
  const navigate = useNavigate();
  const auth = useCheckAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!auth.loading) {
      if (auth.access !== true) {
        console.error("Auth check failed.");
        navigate("/login");
      }
      setIsLoaded(true);
    }
  }, [auth, navigate]);

  const {
    userData,
    handleInputChange,
    handleAvatarChange,
    handleUpdateProfile,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    avatarPath,
  } = useProfile();

  if (!isLoaded || auth.loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Favourites
            </Typography>
            <FavoritesContainer category="favorites" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;
