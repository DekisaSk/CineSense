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

  const movies = [
    {
      title: "Movie 1",
      posterUrl: "https://via.placeholder.com/400x600", // Replace with actual movie poster URL
      movieLink: "#",
    },
    {
      title: "Movie 2",
      posterUrl: "https://via.placeholder.com/400x600", // Replace with actual movie poster URL
      movieLink: "#",
    },
    {
      title: "Movie 3",
      posterUrl: "https://via.placeholder.com/400x600", // Replace with actual movie poster URL
      movieLink: "#",
    },
    {
      title: "Movie 4",
      posterUrl: "https://via.placeholder.com/400x600", // Replace with actual movie poster URL
      movieLink: "#",
    },
    {
      title: "Movie 5",
      posterUrl: "https://via.placeholder.com/400x600", // Replace with actual movie poster URL
      movieLink: "#",
    },
    {
      title: "Movie 6",
      posterUrl: "https://via.placeholder.com/400x600", // Replace with actual movie poster URL
      movieLink: "#",
    },
  ];

  return (
    <>
      <MovieSlider movies={movies} />

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
