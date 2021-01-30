import { useState, useEffect } from 'react';

import { movieSearchByQuery } from '../../services/movie-api';
import MoviesList from '../MoviesList';
import SearchForm from '../SearchForm/SearchForm';

export default function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
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
  }, [searchQuery]);

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
      <SearchForm handleSubmit={setSearchQuery} />
      <MoviesList
        onPageChange={setCurrentPage}
        pages={{ currentPage: currentPage, totalPages: totalPages }}
        movies={movies}
      />
    </>
  );
}
