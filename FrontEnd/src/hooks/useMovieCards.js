import { useState, useEffect } from "react";
import {
  getTopRatedMovies,
  getTopRatedTvShows,
  getPopularMovies,
  getPopularTvShows,
  getMovieGenres,
  getTvGenres,
} from "../api/tmdbApi";

export function useMovieCards(category = "top_rated") {
  const [mediaType, setMediaType] = useState("movie");
  const [allItems, setAllItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [buttonState, setButtonState] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let genreList = [];
        if (mediaType === "movie") {
          genreList = await getMovieGenres();
        } else {
          genreList = await getTvGenres();
        }
        const genreMap = {};
        genreList.forEach((g) => {
          genreMap[g.id] = g.name;
        });

        let data;
        if (mediaType === "movie") {
          data =
            category === "top_rated"
              ? await getTopRatedMovies()
              : await getPopularMovies();
        } else {
          data =
            category === "top_rated"
              ? await getTopRatedTvShows()
              : await getPopularTvShows();
        }

        if (data && data.length) {
          const mapped = data.map((item) => {
            const title =
              mediaType === "movie" ? item.title : item.name || "Untitled";
            const releaseDate =
              mediaType === "movie" ? item.release_date : item.first_air_date;
            const year = releaseDate ? releaseDate.slice(0, 4) : "N/A";

            let genreNames = "";
            if (
              item.genres &&
              Array.isArray(item.genres) &&
              item.genres.length > 0
            ) {
              genreNames = item.genres.map((g) => g.name).join(", ");
            } else if (
              item.genre_ids &&
              Array.isArray(item.genre_ids) &&
              item.genre_ids.length > 0
            ) {
              genreNames = item.genre_ids
                .map((id) => genreMap[id])
                .filter(Boolean)
                .join(", ");
            } else {
              genreNames = "N/A";
            }

            return {
              id: item.tmdb_id,
              title,
              posterPath: item.poster_path,
              rating: item.vote_average ? item.vote_average.toFixed(1) : "N/A",
              year,
              genre: genreNames,
              mediaType: mediaType,
            };
          });

          setAllItems(mapped);
          setDisplayedItems(mapped.slice(0, 4));
          setButtonState(true);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    }

    fetchData();
  }, [category, mediaType]);

  const handleLoadMore = () => {
    const nextBatch = allItems.slice(
      displayedItems.length,
      displayedItems.length + 4
    );
    setDisplayedItems((prev) => [...prev, ...nextBatch]);

    if (displayedItems.length + 4 >= allItems.length) {
      setButtonState(false);
    }
  };

  const handleHideAll = () => {
    setDisplayedItems(allItems.slice(0, 4));
    setButtonState(true);
  };

  const handleSwapMediaType = () => {
    setMediaType((prev) => (prev === "movie" ? "tv" : "movie"));
  };

  return {
    mediaType,
    allItems,
    displayedItems,
    buttonState,
    error,
    handleLoadMore,
    handleHideAll,
    handleSwapMediaType,
  };
}
