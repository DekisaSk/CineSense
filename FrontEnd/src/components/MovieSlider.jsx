import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SliderMovieCard from "./SliderMovieCard";
import { useMovieCards } from "../hooks/useMovieCards";

export default function MovieSlider({ category }) {
  const { allItems: movies, error } = useMovieCards(category);

  if (error) return <div>Error loading movies.</div>;

  return (
    <section className="w-full px-4 md:px-8 py-10">
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
            breakpoint: { max: 440, min: 0 },
            items: 1,
            partialVisibilityGutter: 0,
          },
        }}
      >
        {movies.map((movie) => (
          <SliderMovieCard movie={movie} />
        ))}
      </Carousel>
    </section>
  );
}
