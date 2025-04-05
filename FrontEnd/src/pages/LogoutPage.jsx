import { useNavigate } from "react-router-dom";
import { useRoleContext } from "../contexts/RoleContext"; // Import the context
import { useEffect } from "react";
const LogoutPage = () => {
  const { updateRole } = useRoleContext();

  const navigate = useNavigate();

  useEffect(() => {
    document.cookie =
      "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure";
    updateRole("guest");
    navigate("/login");
  }, [navigate]);

  return null;
};
export default LogoutPage;
