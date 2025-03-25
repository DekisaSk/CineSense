import {
  Box,
  Menu,
  Tooltip,
  Typography,
  MenuItem,
  IconButton,
  Avatar,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

// Naknadno nakon što se sredi backend ograničinit settings
// Ako niko nije ulogovan - prikazuju se opcije registeri Login,
// Ako je ulogovan korisnik, prikazuju se profile i Logout
// Ako je ulogovan AdminPage, prikayuje se profile, admin, logout
const settings = ["Profile", "LogIn", "Register", "Admin", "LogOut"];

export default function ProfileSection() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleMenuNavigation = (event) => {
    const setting = event.target.innerText.toLowerCase();
    const path = `/${setting}`;

    navigate(path);
    handleCloseUserMenu();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User profile">
            <AccountCircleRoundedIcon />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={(event) => handleMenuNavigation(event)}
          >
            <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
