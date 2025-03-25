import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function ModalWindow({ open, handleClose, movie }) {
  if (!movie) return null;

  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      className="mx-auto"
    >
      <div className="relative p-4">
        <button
          className="absolute top-4 left-4 text-blue-500 hover:text-blue-700"
          onClick={handleFavourite}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01z" />
          </svg>
        </button>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-blue-500 hover:text-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <DialogTitle className="text-center text-2xl font-bold">
          {movie?.title}
        </DialogTitle>
      </div>
      <DialogContent className="flex flex-col items-center gap-4 p-6">
        <img
          src={movie?.posterUrl}
          alt={`${movie?.title} Poster`}
          className="w-full max-w-sm rounded-lg shadow-lg"
        />
        <div className="text-gray-300 text-center space-y-2">
          <p className="text-sm font-semibold">
            Genre: {movie?.genre || "Unknown"}
          </p>
          <p className="text-sm font-semibold">
            Rating: {movie?.rating || "N/A"}
          </p>
          <p className="text-sm font-semibold">Year: {movie?.year || "N/A"}</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            {movie?.description || "No description available."}
          </p>
        </div>
      </DialogContent>
      <DialogActions className="justify-center pb-4"></DialogActions>
    </Dialog>
  );
}
