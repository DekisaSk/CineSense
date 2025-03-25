import { Button } from "@mui/material";
import React from "react";
import "../styles/MovieCard.css";

export default function MovieCard({ rating, posterUrl, movieLink }) {
  return (
    <div className="relative w-full h-[40rem] overflow-hidden shadow-lg group">
      <img
        src={posterUrl}
        alt={"poster image"}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        <h2 className="text-white text-2xl font-bold">{"⭐" + rating}</h2>
        <Button onClick={movieLink} className="read-more-btn">
          Read more
        </Button>
      </div>
    </div>
  );
}
