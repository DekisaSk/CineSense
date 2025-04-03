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
        backgroundColor: "background.default",
        color: "text.primary",
        textAlign: "center",
        py: 4,
        px: 2,
        boxShadow: "0 -1px 4px rgba(18, 18, 18, 0.1)",
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
        <Typography variant="body2" mr={1}>
          Get connected with us on social networks:
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton>
            <Facebook />
          </IconButton>
          <IconButton>
            <Twitter />
          </IconButton>
          <IconButton>
            <Instagram />
          </IconButton>
          <IconButton>
            <LinkedIn />
          </IconButton>
        </Stack>
      </Box>
      <Typography variant="body2" mt={2}>
        &copy; 2025 Cinesense. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
