import { useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import MovieSlider from "../components/MovieSlider";
import MovieSearchForm from "../components/SmartSearch/MovieSearchForm";
import { getNowPlayingMovies } from "../api/tmdbApi";

export default function SmartSearch() {
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSearch = async () => {
    setSearched(true);
    setLoading(true);
    setMovies([]);

    try {
      await wait(2000);

      const data = await getNowPlayingMovies();

      const mappedMovies = data.results.map((item) => {
        const chosenPath = item.backdrop_path || item.poster_path || null;
        return {
          id: item.id,
          title: item.title,
          rating: item.vote_average,
          posterPath: chosenPath,
        };
      });

      setMovies(mappedMovies);
    } catch (error) {
      console.error("Error fetching Now Playing:", error);
    } finally {
      setLoading(false);
    }
  };

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
      {!searched && (
        <Box sx={{ width: "100%", maxWidth: 400, textAlign: "center" }}>
          <Typography variant="h4" sx={{ mb: 3, mt: 3, fontWeight: "bold" }}>
            Smart Search
          </Typography>
          <MovieSearchForm onSearch={handleSearch} />
        </Box>
      )}

      {searched && (
        <>
          <Box sx={{ flex: 1, mb: 6 }}>
            {loading ? (
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
            ) : (
              <MovieSlider movies={movies} />
            )}
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
    </Box>
  );
}
