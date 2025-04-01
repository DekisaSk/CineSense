import axios from "axios";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2M1YmExZDhiMTI1Y2MxMDNkMjUzNjk3ZmMwMDU5ZSIsIm5iZiI6MTc0MjY4ODAyNS44NDgsInN1YiI6IjY3ZGY0ZjE5ZTRhOWM4NjkwNjA3YmIwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w4aYXrH9SINSpAKk7FwgzkD0HFg13pJsy33DZmEgYIU";

const tmdbClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export async function getAllMovies() {
  const response = await tmdbClient.get("/discover/movie");
  return response.data.results;
}

export async function getAllTvShows() {
  const response = await tmdbClient.get("/discover/tv");
  return response.data.results;
}

export async function getNowPlayingMovies() {
  const response = await tmdbClient.get("/movie/now_playing");
  return response.data;
}

export async function getTrending(mediaType = "movie") {
  const response = await tmdbClient.get(`/trending/${mediaType}/week`);
  return response.data;
}

export async function getTopRated(mediaType = "movie") {
  const response = await tmdbClient.get(`/${mediaType}/top_rated`);
  return response.data;
}

export async function getPopular(mediaType = "movie") {
  const response = await tmdbClient.get(`/${mediaType}/popular`);
  return response.data;
}

// get genre lists
export async function getMovieGenres() {
  const response = await tmdbClient.get("/genre/movie/list");
  // returns { genres: [ {id, name}, {id, name}, ... ] }
  return response.data.genres;
}

export async function getTvGenres() {
  const response = await tmdbClient.get("/genre/tv/list");
  // returns { genres: [ {id, name}, {id, name}, ... ] }
  return response.data.genres;
}

export async function getMovieDetails(movieId) {
  const response = await tmdbClient.get(
    `/movie/${movieId}?append_to_response=credits`
  );
  return response.data;
}

export async function getTvDetails(tvId) {
  const response = await tmdbClient.get(
    `/tv/${tvId}?append_to_response=credits`
  );
  return response.data;
}

export async function searchMovies(query, page = 1, year) {
  const response = await tmdbClient.get("/search/movie", {
    params: { query, page, year },
  });
  return response.data;
}

export async function searchTv(query, page = 1, year) {
  const response = await tmdbClient.get("/search/tv", {
    params: { query, page, first_air_date_year: year },
  });
  return response.data;
}

export async function searchMulti(query, page = 1) {
  const response = await tmdbClient.get("/search/multi", {
    params: { query, page },
  });
  return response.data;
}

export async function discoverMovies({ page = 1, year }) {
  const params = { page };
  if (year) params.year = year;
  const response = await tmdbClient.get("/discover/movie", { params });
  return response.data;
}

export async function discoverTvShows({ page = 1, year }) {
  const params = { page };
  if (year) params.first_air_date_year = year;
  const response = await tmdbClient.get("/discover/tv", { params });
  return response.data;
}
