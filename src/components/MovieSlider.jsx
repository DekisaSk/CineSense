import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SliderMovieCard from "./SliderMovieCard";

export default function MovieSlider({ movies = [] }) {
  return (
    <section className="w-full px-4 md:px-8 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        In Theaters Now
      </h2>

      <Carousel
        infinite
        autoPlay
        autoPlaySpeed={4000}
        arrows
        keyBoardControl
        showDots={false}
        itemClass="px-2"
        containerClass="pb-4"
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
          },
          tablet: {
            breakpoint: { max: 1024, min: 640 },
            items: 3,
          },
          mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1,
          },
        }}
      >
        {movies.map((movie) => (
          <SliderMovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.posterPath}
            rating={movie.rating}
          />
        ))}
      </Carousel>
    </section>
  );
}
