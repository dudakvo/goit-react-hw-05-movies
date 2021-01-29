import './App.css';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar';
import HomePage from './components/HomePage';
import Movies from './components/Movies';
import MoviesDetailsPage from './components/MovieDetailsPage';

// '/' - компонент <HomePage>, домашняя страница со списком популярных кинофильмов.
// '/movies' - компонент <MoviesPage>, страница поиска фильмов по ключевому слову.
// '/movies/:movieId' - компонент <MovieDetailsPage>, страница с детальной информацией о кинофильме.
// /movies/:movieId/cast - компонент <Cast>, информация о актерском составе. Рендерится на странице <MovieDetailsPage>.
// /movies/:movieId/reviews - компонент <Reviews>, информация об обзорах. Рендерится на странице <MovieDetailsPage>.

function App() {
  return (
    <div className="App">
      <AppBar></AppBar>
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
    </div>
  );
}

export default App;
