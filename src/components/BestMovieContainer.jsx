import { React, useState } from "react";
import "../styles/BestMovieContainer.css";
import BestMovieCard from "./bestMovieCard";
import ModalWindow from "./ModalWindow";

export default function BestMovieContainer() {
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
  console.log(movies);

  const bestMovies = movies.slice(0, 2);

  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleClickOpen = (movie) => {
    setSelectedMovie({ ...movie });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <div className="best-rated-container">
        {bestMovies.map((movie) => (
          <BestMovieCard
            key={movie.id}
            movie={movie}
            moreInfo={() => handleClickOpen(movie)}
          />
        ))}
        {selectedMovie && (
          <ModalWindow
            open={open}
            handleClose={handleClose}
            movie={selectedMovie}
          />
        )}
      </div>
    </>
  );
}
