import { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';

import { getTrendinMovies } from '../../services/movie-api';
import MoviesList from '../../components/MoviesList';

export default function HomePage() {
  const location = useLocation();
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(() => {
    const searchParam = new URLSearchParams(location.search);
    const page = Number(searchParam.get('page'));

    if (Number.isNaN(page) || page === 0) {
      searchParam.delete('page');
      return 1;
    }

    return page ?? 1;
  });
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const moviePromise = getTrendinMovies(currentPage);
    moviePromise
      .then(moviesObj => {
        setMovies(moviesObj.movies);
        setTotalPages(moviesObj.totalPages);
        let searchQuery = '';
        if (currentPage === 1) {
          new URLSearchParams(location.search).delete('page');
        } else {
          searchQuery = queryString.stringify({
            page: currentPage,
          });
        }
        history.push({
          ...location,
          search: searchQuery,
        });
      })
      .catch(error => setError(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
