import './App.css';
import { lazy, Suspense } from 'react';
import Loader from "./components/loader/Loader";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import Navigation from "./components/navigation/Navigation";
import { Routes, Route} from "react-router-dom";

const HomePage = lazy(() => import("./pages/homePage/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/movieDetailsPage/MovieDetailsPage"));
const MoviesPage = lazy(() => import("./pages/moviesPage/MoviePage"));
const MovieCast = lazy(() => import("./components/movieCast/MovieCast"));
const MovieReview = lazy(() => import("./components/movieReviews/MovieReviews"));

function App() {

  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/movies' element={<MoviesPage/>} />
          <Route path='/movies/:movieId' element={<MovieDetailsPage/>} >
            <Route path='cast' element={<MovieCast/>} />
            <Route path='reviews' element={<MovieReview/>} />
          </Route>
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App
