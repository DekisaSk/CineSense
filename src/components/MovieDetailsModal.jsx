import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  CircularProgress,
  Rating,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarBorder from "@mui/icons-material/StarBorder";
import Star from "@mui/icons-material/Star";
import { getMovieDetails } from "../api/tmdbApi";

export default function MovieDetailsModal({ open, onClose, movieId }) {
  const [loading, setLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    if (!open || !movieId) {
      setMovieDetails(null);
      return;
    }

    async function fetchDetails() {
      setLoading(true);
      setMovieDetails(null);

      try {
        const data = await getMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [open, movieId]);

  const handleFavourite = () => {
    setIsFavourite((prev) => !prev);
  };

  if (!open) {
    return null;
  }

  const topCast = movieDetails?.credits?.cast?.slice(0, 5) || [];
  const topCrew = movieDetails?.credits?.crew?.slice(0, 5) || [];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 2,
          px: 2,
        }}
      >
        <IconButton onClick={handleFavourite}>
          {isFavourite ? <Star /> : <StarBorder />}
        </IconButton>
        <DialogTitle sx={{ flex: 1, textAlign: "center", ml: -4 }}>
          {movieDetails?.title || "Loading..."}
        </DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        movieDetails && (
          <DialogContent sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            <Box
              sx={{
                flex: "0 0 auto",
                width: { xs: "100%", sm: 200 },
              }}
            >
              <img
                src={
                  movieDetails.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                    : "https://i.ibb.co/Z1HTQRpH/poster-Flashback.jpg"
                }
                alt="Poster"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  objectFit: "cover",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="body1" sx={{ mr: 1, fontWeight: "bold" }}>
                  Rating:
                </Typography>
                <Rating
                  name="movie-rating"
                  value={movieDetails.vote_average / 2}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({movieDetails.vote_average?.toFixed(1)})
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Year:</strong>{" "}
                {movieDetails.release_date
                  ? movieDetails.release_date.slice(0, 4)
                  : "N/A"}
              </Typography>

              {movieDetails.genres?.length > 0 && (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Genre:</strong>{" "}
                  {movieDetails.genres.map((g) => g.name).join(", ")}
                </Typography>
              )}

              {movieDetails.overview && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Overview:</strong> {movieDetails.overview}
                </Typography>
              )}

              {topCast.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Cast:
                  </Typography>
                  {topCast.map((actor) => {
                    const actorImg = actor.profile_path
                      ? `https://image.tmdb.org/t/p/w45${actor.profile_path}`
                      : "https://i.ibb.co/MkJjZRw2/DALL-E-2025-03-26-15-08-04-A-minimalist-placeholder-image-featuring-a-person-symbol-designed-in-two.webp";
                    return (
                      <Box
                        key={actor.cast_id}
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <img
                          src={actorImg}
                          alt={actor.name}
                          style={{
                            width: 45,
                            height: 45,
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginRight: 8,
                          }}
                        />
                        <Typography variant="body2">
                          <strong>{actor.name}</strong>
                          {actor.character ? ` as ${actor.character}` : ""}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              )}

              {topCrew.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Crew:
                  </Typography>
                  {topCrew.map((crewMember) => {
                    const crewImg = crewMember.profile_path
                      ? `https://image.tmdb.org/t/p/w45${crewMember.profile_path}`
                      : "https://i.ibb.co/MkJjZRw2/DALL-E-2025-03-26-15-08-04-A-minimalist-placeholder-image-featuring-a-person-symbol-designed-in-two.webp";
                    return (
                      <Box
                        key={crewMember.credit_id}
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <img
                          src={crewImg}
                          alt={crewMember.name}
                          style={{
                            width: 45,
                            height: 45,
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginRight: 8,
                          }}
                        />
                        <Typography variant="body2">
                          <strong>{crewMember.name}</strong>
                          {crewMember.job ? ` (${crewMember.job})` : ""}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          </DialogContent>
        )
      )}
    </Dialog>
  );
}
