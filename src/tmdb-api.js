import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2M2NWU0MDJlNGNlYjA3NDI2MjE5YzE4Mzg1NzQzYiIsInN1YiI6IjY2NmM0ZjBmZDVmODljYjE4NzcwZTJjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v4KuCLdYowrtmfiIrisMS8xuNreTxoWCa0aiYM-Gx5A`,
  },
};

export const getTrendingMovies = async () => {
  const response = await axios.get("trending/movie/day", options);
  return response.data.results;
};

export const getsearchMovie = async (query) => {
  const response = await axios.get("search/movie", {
    params: {
      query: query,
    },
    ...options,
  });
  return response.data.results;
};

export const getMoviesDetails = async (movieId) => {
  const response = await axios.get(`movie/${movieId}`, options);
  return response.data;
};

export const getMoviesCast = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits`, options);
  return response.data;
};

export const getMoviesReviews = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`, options);
  return response.data;
};