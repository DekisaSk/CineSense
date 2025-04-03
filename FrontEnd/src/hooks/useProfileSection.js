import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const settings = ["Profile", "LogIn", "Register", "Admin", "LogOut"];

export default function useProfileSection() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleMenuNavigation = useCallback(
    (event) => {
      const setting = event.target.innerText.toLowerCase();
      const path = `/${setting}`;
      navigate(path);
      handleCloseUserMenu();
    },
    [navigate, handleCloseUserMenu]
  );

  return {
    settings,
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    handleMenuNavigation,
  };
}
