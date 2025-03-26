import { Box, Typography } from "@mui/material";
import AuthToggle from "../components/admin/AuthToggle";
import UserManagementCard from "../components/admin/UserManagementCard";
import AddAdminCard from "../components/admin/AddAdminCard";
import StatsCard from "../components/admin/StatsCard";

const AdminPage = () => {
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
        <StatsCard
          title="Total Views"
          data={[12000, 22000, 18000, 26000, 31000, 28000, 45000]}
        />
        <StatsCard
          title="Total Smart Searches"
          data={[90, 150, 130, 200, 240, 210, 300]}
        />
        <StatsCard
          title="Unique Viewers"
          data={[1000, 1700, 1400, 1900, 2300, 1900, 3200]}
        />
        <StatsCard
          title="User Visits"
          data={[80, 130, 110, 180, 210, 170, 280]}
        />
      </Box>
    </Box>
  );
};

export default AdminPage;
