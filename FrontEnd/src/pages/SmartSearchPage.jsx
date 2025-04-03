import { Box, Typography, CircularProgress } from "@mui/material";
import MovieSlider from "../components/MovieSlider";
import MovieSearchForm from "../components/SmartSearch/MovieSearchForm";
import { useSearch } from "../hooks/useSmartSearch";

export default function SmartSearch() {
  const { searched, loading, error, handleSearch } = useSearch();

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
        <Box sx={{ width: "100%", maxWidth: 400, textAlign: "center" }}>
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
            <MovieSlider />
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
