import "../styles/top-movie-card.css";
import StarIcon from "@mui/icons-material/Star";

export default function MovieCard({ movie }) {
  return (
    <>
      <div className="movie-container">
        <div className="img-container">
          <img src="src\assets\scarface-friend-2__27832.jpg" />
        </div>
        <div className="rating">
          <StarIcon sx={{ color: "yellow" }}></StarIcon>
          <p className="description">
            <strong className="text-lg">{movie.rating}</strong>
          </p>
        </div>
        <div className="description-container">
          <h3>
            <strong>{movie.title}</strong>
          </h3>
          <p className="description">
            <strong>Year:</strong> {movie.year}
          </p>
          <p className="description">
            <strong>Genre: </strong>
            {movie.genre}
          </p>
        </div>
        <div className="button-container">
          <button className="more-info-button">More info...</button>
        </div>
      </div>
    </>
  );
}
