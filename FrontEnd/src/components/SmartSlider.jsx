import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SmartCard from "./SmartCard";

export default function SmartSlider({ results = [] }) {
  if (!results.length) return null;

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
          desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
          tablet: { breakpoint: { max: 1024, min: 640 }, items: 3 },
          mobile: { breakpoint: { max: 440, min: 0 }, items: 1 },
        }}
      >
        {results.map((movie) => (
          <SmartCard key={movie.tmdb_id} movie={movie} />
        ))}
      </Carousel>
    </section>
  );
}
