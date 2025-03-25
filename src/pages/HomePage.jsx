import "../styles/HomePage.css";
import MovieSlider from "C:/Users/andri/Coinis Project/CineSense-1/src/components/MovieSlider.jsx";
import TopRatedContainer from "../components/TopRatedContainer";
import BestMovieContainer from "../components/BestMovieContainer";
import ModalWindow from "../components/ModalWindow";
export default function HomePage() {
  return (
    <>
      <ModalWindow></ModalWindow>
      <MovieSlider></MovieSlider>

      <div className="home-container">
        <div className="left-section">
          <h4 className="title">Top Rated:</h4>
          <TopRatedContainer></TopRatedContainer>
        </div>
        <div className="right-section">
          <h4 className="title">Most Popular:</h4>
          <BestMovieContainer></BestMovieContainer>
        </div>
      </div>
    </>
  );
}
