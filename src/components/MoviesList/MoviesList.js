import { Link, useRouteMatch } from 'react-router-dom';
import Pagination from 'react-pagination-library';
import { useLocation } from 'react-router-dom';

import MovieCard from '../MovieCard';

import 'react-pagination-library/build/css/index.css';
import styles from './MoviesList.module.css';

function MoviesList({ movies, pages, onPageChange }) {
  const location = useLocation();

  const { url } = useRouteMatch();

  return (
    <>
      <ul className={styles.movieGallery}>
        {movies.map(movie => {
          const {
            id,
            title,
            posterPath,
            movieRating,
            movieDescription,
          } = movie;
          return (
            <li key={id}>
              <Link
                to={{
                  pathname: url === '/' ? `${url}movies/${id}` : `${url}/${id}`,
                  state: { from: location },
                }}
              >
                <MovieCard
                  movieName={title}
                  movieIMG={posterPath}
                  movieDescription={movieDescription}
                  movieRating={movieRating}
                ></MovieCard>
              </Link>
            </li>
          );
        })}
      </ul>

      {movies.length > 1 && (
        <Pagination
          currentPage={pages.currentPage}
          totalPages={pages.totalPages}
          changeCurrentPage={onPageChange}
          theme="bottom-border"
        />
      )}
    </>
  );
}

export default MoviesList;
