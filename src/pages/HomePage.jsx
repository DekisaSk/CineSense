import "../styles/HomePage.css";
import MovieSlider from "../components/MovieSlider.jsx";
import TopRatedContainer from "../components/TopRatedContainer";
import BestMovieContainer from "../components/BestMovieContainer";
import ModalWindow from "../components/ModalWindow.jsx";

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
      posterUrl: "https://storage.googleapis.com/pod_public/750/262965.jpg", // Replace with actual movie poster URL
      movieLink: "#",
    },
    {
      title: "Movie 2",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg", // Replace with actual movie poster URL
      movieLink: "#",
    },
    {
      title: "Movie 3",
      posterUrl:
        "https://cdn.marvel.com/content/1x/marvsmposterbk_intdesign.jpg", // Replace with actual movie poster URL
      movieLink: "#",
    },
    {
      title: "Movie 4",
      posterUrl: "https://m.media-amazon.com/images/I/51AMyXw-IHL.jpg", // Replace with actual movie poster URL
      movieLink: "#",
    },
    {
      title: "Movie 5",
      posterUrl:
        "https://img.posterstore.com/zoom/wb0039-8batman-redrain50x70_colorcorrectedonlyforweb.jpg?auto=compress%2Cformat&fit=max&w=3840", // Replace with actual movie poster URL
      movieLink: "#",
    },
    {
      title: "Movie 6",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BNzY3OWQ5NDktNWQ2OC00ZjdlLThkMmItMDhhNDk3NTFiZGU4XkEyXkFqcGc@._V1_.jpg", // Replace with actual movie poster URL
      movieLink: "#",
    },
  ];

  return (
    <>
      <MovieSlider movies={movies} />

      <ModalWindow />

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
