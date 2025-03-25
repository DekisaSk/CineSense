import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "./MovieCard";
import ModalWindow from "./ModalWindow";

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
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleClickOpen = (movie) => {
    setSelectedMovie({ ...movie });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="w-full">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        arrows={true}
        keyBoardControl={true}
        tabIndex={0}
        renderArrowsWhenDisabled={false}
        partialVisible={false}
      >
        {movies.map((movie, index) => (
          <>
            <MovieCard
              key={movie.id || index}
              rating={movie.rating}
              posterUrl={movie.posterUrl}
              movieLink={() => handleClickOpen(movie)}
            />
          </>
        ))}
        {selectedMovie && (
          <ModalWindow
            open={open}
            handleClose={handleClose}
            movie={selectedMovie}
          />
        )}
      </Carousel>
    </div>
  );
}
