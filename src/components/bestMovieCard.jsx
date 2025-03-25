import "../styles/best-movie-card.css";
import StarIcon from "@mui/icons-material/Star";
export default function BestMovieCard({ movie }) {
  return (
    <>
      <div className="best-movie-container">
        <div className="best-img-container">
          <img src="src\assets\scarface-friend-2__27832.jpg" />
        </div>
        <div className="best-details">
          <div className="best-rating">
            <StarIcon sx={{ color: "yellow" }}></StarIcon>
            <p className="best-description">
              <strong className="text-lg">{movie.rating}</strong>
            </p>
          </div>
          <div className="best-description-container">
            <h3>
              <strong>{movie.title}</strong>
            </h3>
            <p className="best-description">
              <strong>Year:</strong> {movie.year}
            </p>
            <p className="best-description">
              <strong>Genre: </strong>
              {movie.genre}
            </p>
          </div>
          <div className="best-button-container">
            <button className="more-info-button">More info...</button>
          </div>
        </div>
      </div>
    </>
  );
}
