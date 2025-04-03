import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MovieDetailsModal from "../MovieDetailsModal";
import { useModal } from "../../hooks/useModal";

export default function ItemCard({ movie }) {
  const { isOpen, openModal, closeModal } = useModal();

  const imageUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : "https://i.ibb.co/7NSCb3xf/poster-Flashback.jpg";

  return (
    <>
      <Card
        onClick={openModal}
        sx={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          p: 2,
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 500,
            height: 250,
            maxWidth: "100%",
            objectFit: "cover",
            borderRadius: 2,
          }}
          image={imageUrl}
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
          <Box display="flex" alignItems="center" gap={1}>
            <StarIcon />
            <Typography variant="h6" fontWeight="bold">
              {movie.rating}
            </Typography>
          </Box>

          <Box mt={1}>
            <Typography
              component="h5"
              fontWeight="bold"
              noWrap
              sx={{
                maxWidth: "80%",
                overflow: "clip",
                textOverflow: "ellipsis",
              }}
            >
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

      <MovieDetailsModal open={isOpen} onClose={closeModal} movie={movie} />
    </>
  );
}
