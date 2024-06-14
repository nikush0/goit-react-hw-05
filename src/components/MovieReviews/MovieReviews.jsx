import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getMoviesReviews } from "./../../tmdb-api";
import Loader from "./../../components/Loader/Loader.jsx";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [listOfReviews, setListOfReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function asyncWrapper() {
      try {
        setIsLoading(true);
        const dataOfReviews = await getMoviesReviews(movieId);
        setListOfReviews(dataOfReviews.results);
      } catch (error) {
        return toast.error("This is an error! Please try again later!");
      } finally {
        setIsLoading(false);
      }
    }
    asyncWrapper();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      <ul className={css.list}>
        {listOfReviews.length > 0
          ? listOfReviews.map(({ id, author, content }) => (
              <li key={id}>
                <h3 className={css.title}>Author: {author}</h3>
                <p>`{content}`</p>
              </li>
            ))
          : "We don't have any reviews for this movie."}
      </ul>
    </div>
  );
}