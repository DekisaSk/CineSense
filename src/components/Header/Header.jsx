import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import LogoSection from "./LogoSection";
import NavigationSection from "./NavigationSection";
import ProfileSection from "./ProfileSection";
import MobileMenu from "./MobileMenu";
import { Box, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useThemeToggle } from "./ThemeContext";

export default function Header() {
  const theme = useTheme();
  const { toggleTheme } = useThemeToggle();

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <MobileMenu />
          </Box>

          <Box
            sx={{
              flexGrow: { xs: 1, md: 0 },
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <LogoSection />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <NavigationSection isHeader />
          </Box>

          {/* Theme toggle + Profile section */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 0 }}>
            <IconButton onClick={toggleTheme} sx={{ mr: 1 }}>
              {theme.palette.mode === "dark" ? (
                <Brightness7 sx={{ color: "primary.main" }} /> // 🌞
              ) : (
                <Brightness4 sx={{ color: "secondary.main" }} /> // 🌙
              )}
            </IconButton>
            <ProfileSection />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
