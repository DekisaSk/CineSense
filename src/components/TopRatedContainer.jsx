import React, { useState } from "react";
import MovieCard from "./TopMovieCard";
import "../styles/TopRatedContainer.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
export default function TopRatedContainer() {
  const movies = [
    { id: 1, title: "The Scarface", rating: 9.5, genre: "Action", year: 1987 },
    { id: 2, title: "The Scarface", rating: 9.5, genre: "Action", year: 1987 },
    { id: 3, title: "The Scarface", rating: 9.5, genre: "Action", year: 1987 },
    { id: 4, title: "The Scarface", rating: 9.5, genre: "Action", year: 1987 },
    { id: 5, title: "The Scarface", rating: 9.5, genre: "Action", year: 1987 },
    { id: 6, title: "The Scarface", rating: 9.5, genre: "Action", year: 1987 },
    { id: 7, title: "The Scarface", rating: 9.5, genre: "Action", year: 1987 },
    { id: 8, title: "The Scarface", rating: 9.5, genre: "Action", year: 1987 },
    { id: 9, title: "The Scarface", rating: 9.5, genre: "Action", year: 1987 },
    { id: 10, title: "The Scarface", rating: 9.5, genre: "Action", year: 1987 },
    { id: 11, title: "The Scarface", rating: 9.5, genre: "Action", year: 1987 },
    { id: 12, title: "The Scarface", rating: 9.5, genre: "Action", year: 1987 },
    { id: 13, title: "The Scarface", rating: 9.5, genre: "Action", year: 1987 },
  ];

  const [displayedMovies, setDisplayedMovies] = useState(movies.slice(0, 6));
  const [buttonState, setButtonState] = useState(true);
  const handleLoadMore = () => {
    const nextMovies = movies.slice(
      displayedMovies.length,
      displayedMovies.length + 3
    );
    if (displayedMovies.length + 3 >= movies.length) {
      setButtonState(false);
    }
    setDisplayedMovies((prevMovies) => [...prevMovies, ...nextMovies]);
  };

  const handleHideAll = () => {
    const initMovies = movies.slice(0, 6);
    setDisplayedMovies(initMovies);
    setButtonState(true);
  };

  return (
    <>
      <div className="top-rated-container">
        {displayedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="button-container">
        {buttonState ? (
          <button className="load-more-button" onClick={handleLoadMore}>
            LOAD MORE <ArrowDropDownIcon></ArrowDropDownIcon>
          </button>
        ) : (
          <button className="load-more-button" onClick={handleHideAll}>
            HIDE ALL <ArrowDropUpIcon></ArrowDropUpIcon>
          </button>
        )}
      </div>
    </>
  );
}
