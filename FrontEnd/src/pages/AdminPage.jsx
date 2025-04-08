import { Box, Typography } from "@mui/material";
import AuthToggle from "../components/admin/AuthToggle";
import UserManagementCard from "../components/admin/UserManagementCard";
import AddAdminCard from "../components/admin/AddAdminCard";
import GAStatsCard from "../components/admin/GAStatsCard";
import { useUserRole } from "../hooks/useCheckRole";
import { useRoleContext } from "../contexts/RoleContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCheckAdmin from "../hooks/useCheckAdmin";
import { useState } from "react";

const AdminPage = () => {
  const role = useUserRole();
  const { updateRole } = useRoleContext();
  useEffect(() => {
    if (role) {
      updateRole(role);
    }
  }, [role, updateRole]);

  const navigate = useNavigate();
  const auth = useCheckAdmin();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!auth.loading) {
      if (auth.access !== true) {
        console.error("Auth check failed.");
        navigate("/login");
      }
      setIsLoaded(true);
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (!auth.loading) {
      if (auth.access !== true) {
        console.error("Auth check failed.");
        navigate("/login");
      }
      setIsLoaded(true);
    }
  }, [auth, navigate]);
  // if (!isLoaded || auth.loading) {
  return (
    <Box className="p-4 min-h-screen">
      <Typography variant="h4" className="mb-6">
        Admin Dashboard
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-center">
        <AuthToggle />
        <AddAdminCard />
      </Box>

      <UserManagementCard />

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <GAStatsCard title="Total Views" metric="totalViews" />
        <GAStatsCard title="Total Smart Searches" metric="totalSmartSearches" />
        <GAStatsCard title="Unique Viewers" metric="uniqueViewers" />
        <GAStatsCard title="User Visits" metric="userVisits" />
      </Box>
    </Box>
  );
};
// };

export default AdminPage;
