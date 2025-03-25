// import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "./MovieCard";

const responsive = {
  superLargeDesktop: {
    // screens >= 3000px
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
    slidesToSlide: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1055 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1055, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default function MovieSlider({ movies }) {
  return (
    <div className="py-8 px-4">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        arrows={true}
        keyBoardControl={true}
        centerMode={true}
        tabIndex={0}
      >
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            posterUrl={movie.posterUrl}
            movieLink={movie.movieLink}
          />
        ))}
      </Carousel>
    </div>
  );
}
