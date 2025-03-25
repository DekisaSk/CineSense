import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import LogoSection from "./LogoSection";
import NavigationSection from "./NavigationSection";
import ProfileSection from "./ProfileSection";
import MobileMenu from "./MobileMenu";
import { Box } from "@mui/material";

export default function Header() {
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
            <NavigationSection />
          </Box>

          <Box sx={{ display: "flex", flexGrow: 0 }}>
            <ProfileSection />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
