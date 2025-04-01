import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import ProfileAvatar from "../components/profilePage/ProfileAvatar";
import ProfileDetails from "../components/profilePage/ProfileDetails";
import FavoritesContainer from "../components/FavoritesContainer";
import useProfile from "../hooks/useProfile";

const ProfilePage = () => {
  const {
    userData,
    handleInputChange,
    handleAvatarChange,
    handleUpdateProfile,
  } = useProfile();

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

            <FavoritesContainer category="popular" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;
