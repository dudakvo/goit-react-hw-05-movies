import { useState, useEffect } from 'react';

import { getTrendinMovies } from '../../services/movie-api';
import MoviesList from '../../components/MoviesList';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const moviePromise = getTrendinMovies(currentPage);
    moviePromise
      .then(moviesObj => {
        setMovies(moviesObj.movies);
        setTotalPages(moviesObj.totalPages);
      })
      .catch(error => setError(error));
  }, [currentPage]);
  if (error) {
    return <h1>error.message</h1>;
  }
  return (
    <>
      <h1>Home Page</h1>
      <MoviesList
        onPageChange={setCurrentPage}
        pages={{ currentPage: currentPage, totalPages: totalPages }}
        movies={movies}
      />
    </>
  );
}
