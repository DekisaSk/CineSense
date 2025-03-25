import React from "react";
import { Box, Typography, Link, IconButton, Stack } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import NavigationSection from "./Header/NavigationSection";
import LogoSection from "./Header/LogoSection";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: 4,
        px: 2,
        backgroundColor: "#1976D2",
        boxShadow: "0 -1px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <LogoSection />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
      >
        <NavigationSection />
      </Stack>
      <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
        <Typography variant="body2" color="white" mr={1}>
          Get connected with us on social networks:
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton color="white">
            <Facebook />
          </IconButton>
          <IconButton color="white">
            <Twitter />
          </IconButton>
          <IconButton color="white">
            <Instagram />
          </IconButton>
          <IconButton color="white">
            <LinkedIn />
          </IconButton>
        </Stack>
      </Box>
      <Typography variant="body2" color="white" mt={2}>
        &copy; 2025 Cinesense. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
