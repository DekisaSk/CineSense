import "../styles/TopMovieCard.css";
import StarIcon from "@mui/icons-material/Star";

export default function MovieCard({ movie }) {
  console.log(movie);

  return (
    <>
      <div className="movie-container">
        <div className="img-container">
          <img src={movie.Poster} />
        </div>
        <div className="rating">
          <StarIcon sx={{ color: "yellow" }}></StarIcon>
          <p className="description">
            <strong className="text-lg">{movie.imdbID}</strong>
          </p>
        </div>
        <div className="description-container">
          <h3>
            <strong>{movie.Title}</strong>
          </h3>
          <p className="description">
            <strong>Year:</strong> {movie.Year}
          </p>
          <p className="description">
            <strong>Genre: </strong>
            {movie.Type}
          </p>
        </div>
        <div className="button-container">
          <button className="more-info-button">More info...</button>
        </div>
      </div>
    </>
  );
}
