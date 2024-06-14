import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

import MovieList from "./../../components/MovieList/MovieList";
import Loader from "./../../components/Loader/Loader";
import css from "./HomePage.module.css";
import { getTrendingMovies } from "./../../tmdb-api.js";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function asyncWrapper() {
      try {
        setIsLoading(true);
        const dataOfMovies = await getTrendingMovies();
        setTrendingMovies(dataOfMovies);
      } catch (error) {
        return toast.error("This is an error! Please try again later!");
      } finally {
        setIsLoading(false);
      }
    }
    asyncWrapper();
  }, []);

  return (
    <div>
      <h2 className={css.title}>Trending today</h2>
      {isLoading && <Loader />}
      {trendingMovies.length > 0 && <MovieList data={trendingMovies} />}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}