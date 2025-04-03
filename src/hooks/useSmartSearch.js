import { useState, useCallback } from "react";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function useSearch(initialSearched = false) {
  const [searched, setSearched] = useState(initialSearched);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      //fejk waiting time
      await wait(2000);
      setSearched(true);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { searched, loading, error, handleSearch };
}
