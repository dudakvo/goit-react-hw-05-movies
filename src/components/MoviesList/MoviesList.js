import { useState, useEffect } from 'react';
import Pagination from 'react-pagination-library';

import MovieCard from '../MovieCard';

import 'react-pagination-library/build/css/index.css';
import styles from './MoviesList.module.css';
import { movieSearchByQuery } from '../../services/movie-api';

export default function MoviesList({ movies, pages, onPageChange }) {
  //=========================================
  MoviesList.defaultProps = {
    movies: [],
    pages: { currentPage: 1, totalPages: 1 },
  };

  //const [error, setError] = useState('null');

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
              <MovieCard
                movieName={title}
                movieIMG={posterPath}
                movieDescription={movieDescription}
                movieRating={movieRating}
              ></MovieCard>
            </li>
          );
        })}
      </ul>
      <div>
        {movies.length > 1 && (
          <Pagination
            currentPage={pages.currentPage}
            totalPages={pages.totalPages}
            changeCurrentPage={onPageChange}
            theme="bottom-border"
          />
        )}
      </div>
    </>
  );

  //=========================================
}
