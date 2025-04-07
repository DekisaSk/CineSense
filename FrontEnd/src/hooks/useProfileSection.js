import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRoleContext } from "../contexts/RoleContext";
export default function useProfileSection() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [settings, setSettings] = useState([]);
  const { role } = useRoleContext();
  useEffect(() => {
    if (role === "admin") {
      setSettings(["Profile", "Admin", "LogOut"]);
    } else if (role === "user") {
      setSettings(["Profile", "LogOut"]);
    } else {
      setSettings(["LogIn", "Register"]);
    }
  }, [role]);

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
