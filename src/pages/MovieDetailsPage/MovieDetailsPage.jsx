import {
    Link,
    NavLink,
    Outlet,
    useLocation,
    useParams,
  } from "react-router-dom";
  import { toast, Toaster } from "react-hot-toast";
  import { useEffect, useState, useRef } from "react";
  import { getMoviesDetails } from "./../../tmdb-api";
  import Loader from "./../../components/Loader/Loader.jsx";
  import css from "./MovieDetailsPage.module.css";
  
  export default function MovieDetailsPafe() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const location = useLocation();
    const backLinkHref = useRef(location.state ?? "/movies");
    console.log(backLinkHref);
  
    useEffect(() => {
      if (!movieId) return;
  
      async function asyncWrapper() {
        try {
          setIsLoading(true);
          const dataOfDetails = await getMoviesDetails(movieId);
          setMovieDetails(dataOfDetails);
        } catch (error) {
          return toast.error("This is an error! Please try again later!");
        } finally {
          setIsLoading(false);
        }
      }
      asyncWrapper();
    }, [movieId]);
  
    const defaultImg =
      "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
  
    if (!movieDetails) {
      return;
    }
  
    return (
      <div>
        {isLoading && <Loader />}
        <Link to={backLinkHref.current}>
          <button className={css.btn}>Go back</button>
        </Link>
        <div className={css.container}>
          <img
            src={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                : defaultImg
            }
            width={250}
            alt="poster"
          />
          <div className={css.description}>
            <h2 className={css.titile}>
              <b>{movieDetails.original_title}</b>
            </h2>
            <p>User score: {Number(movieDetails.vote_average).toFixed(2)}</p>
            <h3 className={css.overview}>
              <b>Overview</b>
            </h3>
            <p>{movieDetails.overview}</p>
            <h3 className={css.genres}>
              <b>Genres</b>
            </h3>
            <ul className={css.genresList}>
              {movieDetails.genres &&
                movieDetails.genres.length > 0 &&
                movieDetails.genres.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className={css.additional_information}>Additional information</h2>
          <ul className={css.list}>
            <li>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
        </div>
        <Outlet />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    );
  }