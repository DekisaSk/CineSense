import { useState } from "react";
import MovieSearchForm from "../components/SmartSearch/MovieSearchForm";
import MovieList from "../components/SmartSearch/MovieList";
import { Box, Typography, CircularProgress } from "@mui/material";

const SmartSearch = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = (prompt) => {
    setLoading(true);
    setMovies([]);
    setSearched(true);
    // Dummy data sa fake waiting time kako se simuliralo cekanje na backend response
    setTimeout(() => {
      setMovies([
        {
          id: 1,
          title: "The Matrix",
          year: "1999",
          genre: "Sci-Fi",
          rating: "8.7",
        },
        {
          id: 2,
          title: "Titanic",
          year: "1997",
          genre: "Romance/Drama",
          rating: "7.8",
        },
        {
          id: 3,
          title: "Her",
          year: "2013",
          genre: "Romance/Sci-Fi",
          rating: "8.0",
        },
        {
          id: 4,
          title: "Inception",
          year: "2010",
          genre: "Sci-Fi/Action",
          rating: "8.8",
        },
        {
          id: 5,
          title: "The Notebook",
          year: "2004",
          genre: "Romance/Drama",
          rating: "7.8",
        },
        {
          id: 6,
          title: "Interstellar",
          year: "2014",
          genre: "Sci-Fi",
          rating: "8.6",
        },
        {
          id: 7,
          title: "Eternal Sunshine",
          year: "2004",
          genre: "Romance/Sci-Fi",
          rating: "8.3",
        },
        {
          id: 8,
          title: "Blade Runner",
          year: "1982",
          genre: "Sci-Fi",
          rating: "8.1",
        },
        {
          id: 9,
          title: "La La Land",
          year: "2016",
          genre: "Musical/Romance",
          rating: "8.0",
        },
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <Box
      className={`min-h-screen p-4 flex ${
        searched ? "flex-col md:flex-row" : "justify-center items-center"
      } gap-4`}
    >
      <Box
        className={`transition-all duration-500 ${
          searched ? "md:w-1/3 sticky top-4" : "w-full max-w-lg"
        }`}
      >
        <Typography variant="h4" className="mb-4 pb-4 text-center">
          Smart Search
        </Typography>
        <MovieSearchForm onSearch={handleSearch} />
      </Box>

      {searched && (
        <Box className="md:w-2/3 overflow-auto">
          {loading ? (
            <Box className="flex justify-center items-center h-full">
              <CircularProgress />
            </Box>
          ) : (
            <MovieList movies={movies} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default SmartSearch;
