import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});

const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("access_token="))
  ?.split("=")[1];

export async function getAllMovies(params) {
  const response = await apiClient.get("/movies", { params });
  return response.data;
}

export async function getAllTvShows(params) {
  const response = await apiClient.get("/tv-shows", {
    params: params,
  });
  return response.data;
}

export async function getPopularMovies() {
  const response = await apiClient.get("/movies/popular");
  return response.data;
}

export async function getPopularTvShows() {
  const response = await apiClient.get("/tv-shows/popular");
  return response.data;
}

export async function getTopRatedMovies() {
  const response = await apiClient.get("/movies/top");
  return response.data;
}

export async function getTopRatedTvShows() {
  const response = await apiClient.get("/tv-shows/top");
  return response.data;
}

export async function getNowPlayingMovies() {
  const response = await apiClient.get("/movies/now-playing");
  return response.data;
}

export async function getNowPlayingTvShows() {
  const response = await apiClient.get("/tv-shows/now-playing");
  return response.data;
}

export async function getTrendingMovies() {
  const response = await apiClient.get("/movies/trending");
  return response.data;
}

export async function getTrendingTvShows() {
  const response = await apiClient.get("/tv-shows/trending");
  return response.data;
}

export async function getMovieGenres() {
  const response = await apiClient.get("/movies/genres");
  return response.data;
}

export async function getTvGenres() {
  const response = await apiClient.get("/tv-shows/genres");
  return response.data;
}

export async function getMovieDetails(movieId) {
  const response = await apiClient.get(`/movies/${movieId}`);
  return response.data;
}

export async function getTvDetails(tvId) {
  const response = await apiClient.get(`/tv-shows/${tvId}`);
  return response.data;
}

export async function smartSearchMovies(query) {
  const response = await apiClient.get(
    `/movies/smart-search/${encodeURIComponent(query)}`
  );
  return response.data;
}

export async function smartSearchTvShows(query) {
  const response = await apiClient.get(
    `/tv-shows/smart-search/${encodeURIComponent(query)}`
  );
  return response.data;
}

export async function getUserFavoriteMovie() {
  const response = await apiClient.get(`/movies/favorite`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function getUserFavoriteTvShow() {
  const response = await apiClient.get(`/tv-shows/favorite`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function addMovieToFavorite(movieId) {
  const response = await apiClient.post(
    `/movies/favorite/${movieId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function addTvShowToFavorite(tvId) {
  const response = await apiClient.post(
    `/tv-shows/favorite/${tvId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function removeMovieFromFavorite(movieId) {
  const response = await apiClient.delete(`/movies/favorite/${movieId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function removeTvShowFromFavorite(tvId) {
  const response = await apiClient.delete(`/tv-shows/favorite/${tvId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function isMovieFavorite(movieId) {
  console.log(`CheckMovie: ${token}`);
  const response = await apiClient.get(`/movies/favorite/${movieId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function isTvShowFavorite(tvId) {
  console.log(`CheckTV: ${token}`);
  const response = await apiClient.get(`/tv-shows/favorite/${tvId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
}
