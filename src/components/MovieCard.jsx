import StarIcon from "@mui/icons-material/Star";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
} from "@mui/material";

export default function MovieCard({ movie }) {
  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : "https://via.placeholder.com/400x600";

  return (
    <Card
      className="shadow-md rounded-xl transition-transform hover:scale-[1.02]"
      sx={{
        maxWidth: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        image={posterUrl}
        alt={movie.title}
        sx={{ height: 360, objectFit: "cover" }}
      />
      <CardContent className="flex flex-col gap-2">
        <Box className="flex items-center gap-1 text-yellow-400">
          <StarIcon />
          <Typography variant="body1" fontWeight={600}>
            {movie.rating}
          </Typography>
        </Box>

        <Typography variant="h6" className="font-semibold">
          {movie.title}
        </Typography>

        <Typography variant="body2">
          <strong>Year:</strong> {movie.year}
        </Typography>
        <Typography variant="body2">
          <strong>Genre:</strong> {movie.genre}
        </Typography>
      </CardContent>

      <Box className="px-4 pb-4">
        <Button
          variant="contained"
          fullWidth
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
          onClick={() => console.log("Selected item ID:", movie.id)}
        >
          About
        </Button>
      </Box>
    </Card>
  );
}
