import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MenuItem, Menu, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "List", path: "/list" },
  { name: "Smart Search", path: "/smartsearch" },
  { name: "About Us", path: "/about" },
];

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
        anchorEl={anchorElNav}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {pages.map((page) => (
          <MenuItem
            key={page.name}
            component={Link}
            to={page.path}
            onClick={handleCloseNavMenu}
          >
            <Typography sx={{ textAlign: "center" }}>{page.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
