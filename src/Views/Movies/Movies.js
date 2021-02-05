import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { movieSearchByQuery } from '../../services/movie-api';
import MoviesList from '../../components/MoviesList';
import SearchForm from '../../components/SearchForm';

export default function Movies() {
  const location = useLocation();
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(
    () => new URLSearchParams(location.search).get('page') ?? 1,
  );

  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchParam = new URLSearchParams(location.search);
    const searchURL = searchParam.get('search-movies');
    const page = searchParam.get('page');
    setCurrentPage(page);

    if (!searchURL) {
      return;
    }

    setCurrentPage(Number(page));

    const moviePromise = movieSearchByQuery(searchURL, page);
    moviePromise
      .then(moviesObj => {
        setMovies(moviesObj.movies);
        setTotalPages(moviesObj.totalPages);
      })
      .catch(error => setError(error));
  }, [location]);

  function pageChange(page) {
    setCurrentPage(page);
    const searchParam = new URLSearchParams(location.search);
    searchParam.set('page', page);
    history.push({
      ...location,
      search: searchParam.toString(),
    });
  }

  if (error) {
    return <h1>error.message</h1>;
  }
  return (
    <>
      <h1>Movies page</h1>
      <SearchForm />
      <MoviesList
        onPageChange={pageChange}
        pages={{ currentPage: currentPage, totalPages: totalPages }}
        movies={movies}
      />
    </>
  );
}
