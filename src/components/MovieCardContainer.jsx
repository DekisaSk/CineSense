import { useEffect, useState } from "react";
import { Container, Button, Grid } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MovieCard from "./MovieCard";
import {
  getTopRated,
  getPopular,
  getMovieGenres,
  getTvGenres,
} from "../api/tmdbApi";

export default function MovieCardContainer({ category = "top_rated" }) {
  const [mediaType, setMediaType] = useState("movie");
  const [allItems, setAllItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [buttonState, setButtonState] = useState(true);

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
        if (category === "top_rated") {
          data = await getTopRated(mediaType);
        } else {
          data = await getPopular(mediaType);
        }

        if (data && data.results) {
          const mapped = data.results.map((item) => {
            const title =
              mediaType === "movie" ? item.title : item.name || "Untitled";
            const releaseDate =
              mediaType === "movie" ? item.release_date : item.first_air_date;
            const year = releaseDate ? releaseDate.slice(0, 4) : "N/A";

            const genreNames = item.genre_ids
              .map((id) => genreMap[id])
              .filter(Boolean)
              .join(", ");

            return {
              id: item.id,
              title,
              posterPath: item.poster_path,
              rating: item.vote_average?.toFixed(1),
              year,
              genre: genreNames || "N/A",
            };
          });

          setAllItems(mapped);
          setDisplayedItems(mapped.slice(0, 4));
          setButtonState(true);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
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

  return (
    <Container maxWidth="lg" className="py-12">
      <Button
        variant="contained"
        onClick={handleSwapMediaType}
        sx={{ marginBottom: 4 }}
      >
        {mediaType === "movie" ? "Switch to Series" : "Switch to Movies"}
      </Button>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        className="mt-4"
        sx={{ justifyContent: "flex-start" }}
      >
        {displayedItems.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      <div className="flex justify-center mt-10">
        {buttonState && displayedItems.length < allItems.length ? (
          <Button
            variant="contained"
            onClick={handleLoadMore}
            endIcon={<ArrowDropDownIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 4,
              py: 1.5,
            }}
          >
            Load More
          </Button>
        ) : (
          allItems.length > 4 && (
            <Button
              variant="contained"
              onClick={handleHideAll}
              endIcon={<ArrowDropUpIcon />}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 4,
                py: 1.5,
              }}
            >
              Hide All
            </Button>
          )
        )}
      </div>
    </Container>
  );
}
