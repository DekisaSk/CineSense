import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";

export default function SmallMovieCard({ movie }) {
  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : "https://via.placeholder.com/400x600";

  return (
    <div className="flex flex-col md:flex-row shadow-md rounded-2xl overflow-hidden p-4 gap-4 max-w-4xl mx-auto">
      <div className="flex-shrink-0 w-full md:w-1/3">
        <img
          src={posterUrl}
          alt={movie.title}
          className="object-cover h-full w-full rounded-xl"
        />
      </div>

      <div className="flex flex-col justify-between w-full md:w-2/3">
        <div className="flex items-center gap-1 text-yellow-400">
          <StarIcon />
          <p className="text-lg font-semibold">{movie.rating}</p>
        </div>

        <div className="mt-2">
          <h3 className="text-2xl font-bold">{movie.title}</h3>
          <p>
            <strong>Year:</strong> {movie.year}
          </p>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
        </div>

        <div className="mt-4">
          <Button
            variant="contained"
            color="primary"
            size="small"
            fullWidth
            onClick={() => console.log("Selected trending item ID:", movie.id)}
          >
            About
          </Button>
        </div>
      </div>
    </div>
  );
}
