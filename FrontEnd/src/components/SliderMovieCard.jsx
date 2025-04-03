import { useModal } from "../hooks/useModal";
import Button from "@mui/material/Button";
import MovieDetailsModal from "./MovieDetailsModal";

export default function SliderMovieCard({ movie }) {
  const { isOpen, openModal, closeModal } = useModal();

  const backgroundUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/original${movie.posterPath}`
    : "https://i.ibb.co/Z1HTQRpH/poster-Flashback.jpg";

  return (
    <>
      <div
        className="relative w-full max-w-xs h-[30rem] rounded-xl overflow-hidden shadow-md group"
        onClick={openModal}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />
        <div className="absolute inset-0 bg-opacity-50 group-hover:bg-opacity-60 transition-opacity" />
        <div className="relative z-10 h-full flex flex-col justify-between p-5">
          <h2
            className="text-xl font-semibold leading-tight text-yellow-400"
            style={{
              textShadow:
                "-1px -1px 0 rgba(0, 0, 0, 0.18), 1px -1px 0 rgba(0,0,0,0.18), -1px 1px 0 rgba(0,0,0,0.18), 1px 1px 0 rgba(0,0,0,0.18)",
            }}
          >
            {movie.title} <br />
            <span
              className="text-sm font-normal text-yellow-400"
              style={{
                textShadow:
                  "-1px -1px 0 rgba(0,0,0,0.18), 1px -1px 0 rgba(0,0,0,0.18), -1px 1px 0 rgba(0,0,0,0.18), 1px 1px 0 rgba(0,0,0,0.18)",
              }}
            >
              rating: {Number(movie.rating).toFixed(1)}
            </span>
          </h2>

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: "auto",
              textTransform: "none",
              borderRadius: "0.5rem",
            }}
          >
            Read More
          </Button>
        </div>
      </div>
      <MovieDetailsModal open={isOpen} onClose={closeModal} movie={movie} />
    </>
  );
}
