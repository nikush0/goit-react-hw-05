import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./../../components/Navigation/Navigation.jsx";
import MovieCast from "./../../components/MovieCast/MovieCast.jsx";
import MovieReviews from "./../../components/MovieReviews/MovieReviews.jsx";
const HomePage = lazy(() => import("./../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() =>
  import("./../../pages/MoviesPage/MoviesPage.jsx")
);
const MovieDetailsPage = lazy(() =>
  import("./../../pages/MovieDetailsPage/MovieDetailsPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("./../../pages/NotFoundPage/NotFoundPage.jsx")
);
import css from "./App.module.css";

export default function App() {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}