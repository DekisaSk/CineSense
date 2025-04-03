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
import useProfileSection from "../../hooks/useProfileSection";

// Naknadno nakon što se sredi backend ograničinit settings
// Ako niko nije ulogovan - prikazuju se opcije registeri Login,
// Ako je ulogovan korisnik, prikazuju se profile i Logout
// Ako je ulogovan AdminPage, prikayuje se profile, admin, logout

export default function ProfileSection() {
  const {
    settings,
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    handleMenuNavigation,
  } = useProfileSection();

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
          <MenuItem key={setting} onClick={handleMenuNavigation}>
            <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
