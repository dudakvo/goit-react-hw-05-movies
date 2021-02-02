import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { movieSearchByQuery } from '../../services/movie-api';
import MoviesList from '../../components/MoviesList';
import SearchForm from '../../components/SearchForm';

export default function Movies() {
  const [searchQuery, setSearchQuery] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    setSearchQuery(new URLSearchParams(location.search).get('search-movies'));
    if (!searchQuery) {
      return;
    }

    setCurrentPage(1);
    const moviePromise = movieSearchByQuery(searchQuery);
    moviePromise
      .then(moviesObj => {
        setMovies(moviesObj.movies);
        setTotalPages(moviesObj.totalPages);
      })
      .catch(error => setError(error));
  }, [location, searchQuery]);

  useEffect(() => {
    if (currentPage === 1) {
      return;
    }
    const moviePromise = movieSearchByQuery(searchQuery, currentPage);
    moviePromise
      .then(moviesObj => {
        setMovies(moviesObj.movies);
        setTotalPages(moviesObj.totalPages);
      })
      .catch(error => setError(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (error) {
    return <h1>error.message</h1>;
  }
  return (
    <>
      <h1>Movies page</h1>
      <SearchForm />
      <MoviesList
        onPageChange={setCurrentPage}
        pages={{ currentPage: currentPage, totalPages: totalPages }}
        movies={movies}
      />
    </>
  );
}
