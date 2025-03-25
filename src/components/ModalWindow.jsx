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
          {isFavourite ? (
            // Golden filled star when movie is a favorite
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="#FFD700"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          ) : (
            // Blue outlined star when movie is not a favorite
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="none"
                stroke="#1E90FF"
                strokeWidth="2"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          )}
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
