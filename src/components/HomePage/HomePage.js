import { getTrendinMovies } from '../../services/movie-api';
import { useState, useEffect } from 'react';
import Pagination from 'react-pagination-library';

import Movie from '../Movie';
import MoviesList from '../MoviesList';

import 'react-pagination-library/build/css/index.css';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('null');

  useEffect(() => {
    const moviesPromise = getTrendinMovies(currentPage);
    moviesPromise.then(moviesObj => {
      console.log('moviesObj.movies', moviesObj);
      setMovies(moviesObj.movies);
      setTotalPages(moviesObj.totalPages);
    });
  }, [currentPage]);

  // movieName,
  // movieIMG,
  // movieGenre,
  // movieRating,
  // movieDescription,

  return (
    <>
      <h1>Home Page</h1>
      <ul className={styles.ImageGallery}>
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
              <Movie
                movieName={title}
                movieIMG={posterPath}
                movieDescription={movieDescription}
                movieRating={movieRating}
              ></Movie>
            </li>
          );
        })}
      </ul>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          changeCurrentPage={setCurrentPage}
          theme="bottom-border"
        />
      </div>
    </>
  );
}
