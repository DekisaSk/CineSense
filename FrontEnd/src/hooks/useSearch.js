import { useState, useEffect } from "react";
import {
  getMovieGenres,
  getTvGenres,
  getAllMovies,
  getAllTvShows,
} from "../api/tmdbApi";

export default function useSearch({ query, type, genre, year }) {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const genres =
          type === "tv" ? await getTvGenres() : await getMovieGenres();
        setGenreList(genres);
      } catch (err) {
        console.error("Failed to load genres:", err);
      }
    }
    if (type !== "all") fetchGenres();
  }, [type]);

  useEffect(() => {
    async function fetchFiltered() {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (year) params.year = parseInt(year);
        if (genre) params.genre_id = parseInt(genre);
        if (query) params.title = query;

        let data = [];

        if (type === "movie") {
          data = await getAllMovies(params);
        } else if (type === "tv") {
          data = await getAllTvShows(params);
        } else {
          data = [];
        }

        const mapped = data.map((item) => {
          const title = item.title || item.name || "Untitled";
          const releaseDate = item.release_date || item.first_air_date || "";
          const itemYear = releaseDate ? releaseDate.slice(0, 4) : "";
          const genreNames = item.genres?.map((g) => g.name).join(", ") || "";

          return {
            id: item.tmdb_id,
            title,
            posterPath: item.poster_path || item.backdrop_path,
            rating: item.vote_average?.toFixed(1) || "N/A",
            year: itemYear,
            genre: genreNames,
            popularity: item.popularity,
            mediaType: type,
          };
        });

        setItems(mapped);
        setTotalPages(1);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }

    fetchFiltered();
  }, [query, type, genre, year]);

  return { items, totalPages, loading, error, genreList };
}
