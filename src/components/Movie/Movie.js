import styles from './Movie.module.css';
import notFoundIMG from '../../img/notFound.jpg';

export default function Movie({
  movieName,
  movieIMG,
  movieGenre,
  movieRating,
  movieDescription,
}) {
  return (
    <div className={styles.movie_card}>
      <p>{movieName ? movieName : 'movieName'}</p>
      {movieIMG === 'not found' ? (
        <img src={notFoundIMG} alt="" className={styles.movie_poster} />
      ) : (
        <img src={movieIMG} alt="" className={styles.movie_poster} />
      )}

      <span>{movieRating ? movieRating : 'movieRating'}</span>
      <span>{movieGenre ? movieGenre : 'movieGenre'}</span>
      <p>{movieDescription}</p>
      <p> </p>
    </div>
  );
}
