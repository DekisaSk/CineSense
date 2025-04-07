import { useState, useCallback } from "react";
import { smartSearchMovies, smartSearchTvShows } from "../api/tmdbApi";

export function useSmartSearch(initialSearched = false) {
  const [searched, setSearched] = useState(initialSearched);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [mediaType, setMediaType] = useState("movie");

  const handleSearch = useCallback(async (query, selectedType = "movie") => {
    setLoading(true);
    setError(null);
    setMediaType(selectedType);

    try {
      const data =
        selectedType === "movie"
          ? await smartSearchMovies(query)
          : await smartSearchTvShows(query);

      setResults(data);
      setSearched(true);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { searched, loading, error, handleSearch, results, mediaType };
}
