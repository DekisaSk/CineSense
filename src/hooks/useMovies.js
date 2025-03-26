import { useState, useEffect } from "react";
import { getAllMovies, getAllTvShows } from "../api/tmdbApi";

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
        const data = await (type === "movie"
          ? getAllMovies()
          : getAllTvShows());
        const mappedData = data.map((item) => ({
          id: item.id,
          title: item.title || item.name,
          posterPath: item.backdrop_path,
          rating: item.vote_average?.toFixed(1),
          year:
            item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4),
        }));
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

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.title
          .trim()
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
      );
    }
    if (genre) {
      filtered = filtered.filter((item) => item.genre?.includes(genre));
    }
    if (year) {
      filtered = filtered.filter((item) => item.year === year);
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
