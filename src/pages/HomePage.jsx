import "../styles/HomePage.css";
import MovieSlider from "../components/MovieSlider.jsx";
import TopRatedContainer from "../components/TopRatedContainer";
import BestMovieContainer from "../components/BestMovieContainer";
export default function HomePage() {
  const apiKey = "d9bb4067";

  // fetch(`https://www.omdbapi.com/?s=inception&apikey=${ap}&page=1`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => console.error("Error:", error));

  return (
    <>
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
