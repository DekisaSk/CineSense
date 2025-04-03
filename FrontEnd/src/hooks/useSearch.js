import { useState, useEffect } from "react";
import {
  searchMovies,
  searchTv,
  searchMulti,
  getMovieGenres,
  getTvGenres,
  discoverMovies,
  discoverTvShows,
} from "../api/tmdbApi";

export default function useSearch({ query, type, genre, year, page }) {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genreMap, setGenreMap] = useState({});

  useEffect(() => {
    async function fetchGenres() {
      try {
        let genres = [];
        if (type === "movie" || type === "all") {
          genres = await getMovieGenres();
        } else if (type === "tv") {
          genres = await getTvGenres();
        }
        const map = {};
        genres.forEach((g) => {
          map[g.id] = g.name;
        });
        setGenreMap(map);
      } catch (e) {
        console.error("Error fetching genres:", e);
      }
    }
    fetchGenres();
  }, [type]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (query.trim()) {
          if (type === "movie") {
            data = await searchMovies(query, page, year);
          } else {
            data = await searchTv(query, page, year);
          }
        } else {
          if (type === "movie") {
            data = await discoverMovies({ page, year });
          } else {
            data = await discoverTvShows({ page, year });
          }
        }

        const mapped = data.results.map((item) => {
          const title = item.title || item.name || "Untitled";
          const releaseDate = item.release_date || item.first_air_date || "";
          const itemYear = releaseDate ? releaseDate.slice(0, 4) : "";
          const genreNames =
            item.genre_ids && Array.isArray(item.genre_ids)
              ? item.genre_ids
                  .map((id) => genreMap[id])
                  .filter(Boolean)
                  .join(", ")
              : "";
          return {
            id: item.id,
            title,
            posterPath: item.backdrop_path,
            rating: item.vote_average ? item.vote_average.toFixed(1) : "N/A",
            year: itemYear,
            genre: genreNames,
            popularity: item.popularity,
            mediaType: type,
          };
        });

        const sorted = mapped.sort((a, b) => b.popularity - a.popularity);
        setItems(sorted);
        setTotalPages(data.total_pages);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query, type, year, page, genreMap]);

  const filteredItems = genre.trim()
    ? items.filter((item) =>
        item.genre.toLowerCase().includes(genre.trim().toLowerCase())
      )
    : items;

  return { items: filteredItems, totalPages, loading, error };
}
