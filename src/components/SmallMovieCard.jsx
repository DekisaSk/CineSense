import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MovieDetailsModal from "./MovieDetailsModal";

export default function SmallMovieCard({ movie }) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : "https://i.ibb.co/7NSCb3xf/poster-Flashback.jpg";

  return (
    <>
      <Card
        onClick={handleOpenModal}
        sx={{
          display: "flex",
          flexDirection: "row",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          maxWidth: 800,
          mx: "auto",
          p: 2,
          height: "100%",
          width: "100%",
          minWidth: "250px",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "30%",
            // height: "40%",
            objectFit: "cover",
            borderRadius: 2,
          }}
          image={posterUrl}
          alt={movie.title}
        />

        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box display="flex" alignItems="center" color="primary" gap={1}>
            <StarIcon />
            <Typography variant="h6" fontWeight="bold">
              {movie.rating}
            </Typography>
          </Box>

          <Box mt={1}>
            <Typography component="h5" fontWeight="bold">
              {movie.title}
            </Typography>
            <Typography variant="body1">
              <strong>Year:</strong> {movie.year}
            </Typography>
            <Typography variant="body1">
              <strong>Genre:</strong> {movie.genre}
            </Typography>
          </Box>

          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth size="small">
              About
            </Button>
          </Box>
        </CardContent>
      </Card>

      <MovieDetailsModal
        open={openModal}
        onClose={handleCloseModal}
        movieId={movie.id}
      />
    </>
  );
}
