import "../styles/BestMovieContainer.css";
import BestMovieCard from "./bestMovieCard";
import getData from "./GetData";
import { useState, useEffect } from "react";
export default function BestMovieContainer() {
  const [bestMovies, setBestMovies] = useState([]);

  useEffect(() => {
    async function fetchBestMovies() {
      const movies = await getData();
      console.log(movies);

      const slicedMovies = movies.slice(0, 2);
      setBestMovies(slicedMovies);
    }

    fetchBestMovies();
  }, []);

  return (
    <>
      <div className="best-rated-container">
        {bestMovies.map((movie, index) => (
          <BestMovieCard key={index} movie={movie} />
        ))}
      </div>
    </>
  );
}
