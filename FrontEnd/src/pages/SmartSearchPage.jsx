import { Box, Typography, CircularProgress } from "@mui/material";

import SmartSlider from "../components/SmartSlider";
import MovieSearchForm from "../components/SmartSearch/MovieSearchForm";
import { useSmartSearch } from "../hooks/useSmartSearch";
import { useUserRole } from "../hooks/useCheckRole";
import { useRoleContext } from "../contexts/RoleContext";
import { useEffect } from "react";

export default function SmartSearch() {
  const { searched, loading, error, handleSearch, results } = useSmartSearch();
  const role = useUserRole();
  const { updateRole } = useRoleContext();
  useEffect(() => {
    if (role) {
      updateRole(role);
    }
  }, [role, updateRole]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: searched ? "stretch" : "center",
        justifyContent: searched ? "flex-start" : "center",
        px: 2,
        pt: 2,
        pb: 2,
      }}
    >
      {!searched && !loading && (
        <Box sx={{ width: "100%", maxWidth: 600, textAlign: "center" }}>
          <Typography variant="h4" sx={{ mb: 3, mt: 3, fontWeight: "bold" }}>
            Smart Search
          </Typography>

          <MovieSearchForm onSearch={handleSearch} />
        </Box>
      )}

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {searched && !loading && (
        <>
          <Box sx={{ flex: 1, mb: 6 }}>
            <SmartSlider results={results} />
          </Box>

          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              left: 0,
              right: 0,
              py: 2,
              bgcolor: "background.paper",
              boxShadow: 4,
            }}
          >
            <MovieSearchForm onSearch={handleSearch} />
          </Box>
        </>
      )}

      {error && (
        <Typography variant="body1" color="error">
          Error: {error.message}
        </Typography>
      )}
    </Box>
  );
}
