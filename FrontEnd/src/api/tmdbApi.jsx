import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});

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
