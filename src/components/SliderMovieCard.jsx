import { useState } from "react";
import Button from "@mui/material/Button";
import MovieDetailsModal from "./MovieDetailsModal";

export default function SliderMovieCard({ id, title, posterPath, rating }) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const backgroundUrl = posterPath
    ? `https://image.tmdb.org/t/p/original${posterPath}`
    : "https://i.ibb.co/Z1HTQRpH/poster-Flashback.jpg";

  return (
    <>
      <div
        className="relative w-full max-w-xs h-[30rem] rounded-xl overflow-hidden shadow-md group"
        onClick={handleOpenModal}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />

        <div className="absolute inset-0 bg-opacity-50 group-hover:bg-opacity-60 transition-opacity" />

        <div className="relative z-10 h-full flex flex-col justify-between p-5">
          <h2 className="text-xl font-semibold leading-tight text-yellow-400">
            {title} <br />
            <span className="text-sm font-normal text-yellow-400">
              Rating: {rating.toFixed(1)}
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

      <MovieDetailsModal
        open={openModal}
        onClose={handleCloseModal}
        movieId={id}
      />
    </>
  );
}
