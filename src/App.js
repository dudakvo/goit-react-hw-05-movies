import './App.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import AppBar from './components/AppBar';
//import HomePage from './components/HomePage';
//import Movies from './components/Movies';
//import MoviesDetailsPage from './components/MovieDetailsPage';

const HomePage = lazy(
  () => import('./components/HomePage') /* webpackChunkName: "HomePage" */,
);
const Movies = lazy(
  () => import('./components/Movies') /* webpackChunkName: "Movies" */,
);
const MoviesDetailsPage = lazy(
  () =>
    import(
      './components/MovieDetailsPage'
    ) /*webpackChunkName: "MoviesDetailsPage"*/,
);

// '/' - компонент <HomePage>, домашняя страница со списком популярных кинофильмов.
// '/movies' - компонент <MoviesPage>, страница поиска фильмов по ключевому слову.
// '/movies/:movieId' - компонент <MovieDetailsPage>, страница с детальной информацией о кинофильме.
// /movies/:movieId/cast - компонент <Cast>, информация о актерском составе. Рендерится на странице <MovieDetailsPage>.
// /movies/:movieId/reviews - компонент <Reviews>, информация об обзорах. Рендерится на странице <MovieDetailsPage>.

function App() {
  return (
    <div className="App">
      <AppBar></AppBar>
      <Suspense fallback={<Loader type="Puff" />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <Movies />
          </Route>
          <Route path="/movies/:movieID">
            <MoviesDetailsPage />
          </Route>
          <Route>
            <HomePage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
