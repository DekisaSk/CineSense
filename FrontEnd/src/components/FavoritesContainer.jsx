import { Container, Button, Grid } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MovieCard from "./MovieCard";
import { useMovieCards } from "../hooks/useMovieCards";

export default function FavoritesContainer({ category }) {
  const {
    mediaType,
    displayedItems,
    allItems,
    buttonState,
    error,
    handleLoadMore,
    handleHideAll,
    handleSwapMediaType,
  } = useMovieCards(category);

  if (error) return <div>Error fetching movies.</div>;

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
          <Grid item xs={12} sm={6} md={4} lg={6} key={movie.id}>
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
