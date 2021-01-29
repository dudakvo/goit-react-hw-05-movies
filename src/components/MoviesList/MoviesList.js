import { Link, useRouteMatch } from 'react-router-dom';
import Pagination from 'react-pagination-library';

import MovieCard from '../MovieCard';

import 'react-pagination-library/build/css/index.css';
import styles from './MoviesList.module.css';

export default function MoviesList({ movies, pages, onPageChange }) {
  //const [error, setError] = useState('null');
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
              <Link to={url === '/' ? `${url}movies/${id}` : `${url}/${id}`}>
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
