import MovieCard from "./TopMovieCard";
import "../styles/TopRatedContainer.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState, useEffect } from "react";
import getData from "./GetData";
export default function TopRatedContainer() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchBestMovies() {
      const movies = await getData();
      console.log(movies);

      setMovies(movies);
    }

    fetchBestMovies();
  }, []);

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
        {movies.map((movie) => (
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
