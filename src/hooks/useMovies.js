import { useState, useEffect } from "react";
import {
  getAllMovies,
  getAllTvShows,
  getMovieGenres,
  getTvGenres,
} from "../api/tmdbApi";

export default function useMovies() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("movie");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        let genreList = [];
        if (type === "movie") {
          genreList = await getMovieGenres();
        } else {
          genreList = await getTvGenres();
        }

        const genreMap = {};
        genreList.forEach((g) => {
          genreMap[g.id] = g.name;
        });

        let data;
        if (type === "movie") {
          data = await getAllMovies();
        } else {
          data = await getAllTvShows();
        }

        const mappedData = data.map((item) => {
          const names = item.genre_ids
            ?.map((id) => genreMap[id])
            .filter(Boolean);
          const genreString = names?.length ? names.join(", ") : "";

          return {
            id: item.id,
            title: item.title || item.name,
            posterPath: item.backdrop_path,
            rating: item.vote_average?.toFixed(1),
            year:
              item.release_date?.slice(0, 4) ||
              item.first_air_date?.slice(0, 4) ||
              "",
            genre: genreString,
          };
        });

        setItems(mappedData);
        setFilteredItems(mappedData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchData();
  }, [type]);

  useEffect(() => {
    let filtered = items;

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((item) =>
        item.title?.toLowerCase().includes(q)
      );
    }

    if (genre.trim()) {
      const g = genre.trim().toLowerCase();
      filtered = filtered.filter((item) =>
        item.genre?.toLowerCase().includes(g)
      );
    }

    if (year.trim()) {
      filtered = filtered.filter((item) => item.year === year.trim());
    }

    setFilteredItems(filtered);
  }, [searchQuery, genre, year, items]);

  return {
    filteredItems,
    setSearchQuery,
    type,
    setType,
    genre,
    setGenre,
    year,
    setYear,
  };
}
