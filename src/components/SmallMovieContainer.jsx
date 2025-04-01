import { Button } from "@mui/material";
import SmallMovieCard from "./SmallMovieCard";
import { useMovieCards } from "../hooks/useMovieCards";

export default function SmallMovieContainer({ category = "trending" }) {
  const {
    allItems: items,
    mediaType,
    error,
    handleSwapMediaType,
  } = useMovieCards(category);

  if (error) return <div>Error fetching data.</div>;

  const displayedItems = items.slice(0, 2);

  return (
    <div className="flex flex-col gap-6 p-4">
      <Button variant="outlined" onClick={handleSwapMediaType}>
        {mediaType === "movie"
          ? "Show Trending Series"
          : "Show Trending Movies"}
      </Button>

      <div className="flex flex-wrap gap-6 justify-start">
        {displayedItems.map((movie) => (
          <SmallMovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
}
