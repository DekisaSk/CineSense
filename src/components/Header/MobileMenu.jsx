import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MenuItem, Menu, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const pages = ["Home", "List", "Custom Page", "About Us"];

export default function MobileMenu() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "flex", md: "none" },
      }}
    >
      <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        anchorEl={anchorElNav}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {pages.map((page) => (
          <MenuItem key={page}>
            <Typography
              sx={{ textAlign: "center" }}
              onClick={handleCloseNavMenu}
            >
              {page}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
