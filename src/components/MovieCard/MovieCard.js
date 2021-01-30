import styles from './MovieCard.module.css';
import notFoundIMG from '../../img/notFound.jpg';

export default function MovieCard({ movieName, movieIMG }) {
  return (
    <div className={styles.movie_card}>
      <p>{movieName ? movieName : 'movieName'}</p>
      {movieIMG === 'not found' ? (
        <img src={notFoundIMG} alt="" className={styles.movie_poster} />
      ) : (
        <img src={movieIMG} alt="" className={styles.movie_poster} />
      )}
    </div>
  );
}
