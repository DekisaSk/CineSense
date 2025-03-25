import React from "react";

export default function MovieCard({ title, posterUrl, movieLink }) {
  return (
    <div className="relative w-full h-[40rem] overflow-hidden shadow-lg group">
      <img
        src={posterUrl}
        alt={title + " poster image"}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        <h2 className="text-white text-2xl font-bold">{title}</h2>
        <a
          href={movieLink}
          className="mt-auto py-3 px-6 bg-blue-500 text-white text-center rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
