import React from "react";
import MovieCard from "../TopMovieCard";
import { Box } from "@mui/material";

const MovieList = ({ movies }) => {
  return (
    <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Box>
  );
};

export default MovieList;
