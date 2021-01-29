import { useParams, NavLink, Route, useRouteMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import notFoundIMG from '../../img/notFound.jpg';

import { getMovieByID } from '../../services/movie-api';

import s from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieID } = useParams();
  const [movieDetails, setMovieDetails] = useState();
  useEffect(() => {
    getMovieByID(movieID).then(details => setMovieDetails(details));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (movieDetails) {
    const {
      homepage,
      genres,
      poster,
      tagline,
      title,
      runtime,
      overview,
      vote,
    } = movieDetails;
    return (
      <div className={s.movie_details}>
        <h1>{title}</h1>
        {poster ? (
          <img src={poster} alt={title} height="300px" />
        ) : (
          <img src={notFoundIMG} alt={title} height="300px" />
        )}
        <h2>{tagline}</h2>
        {homepage && <a href={homepage}>{homepage}</a>}
        <p>Genre: {genres.map(genre => genre)}</p>
        <p>
          vote:<span>{vote}</span>
        </p>
        <p>
          runtime:<span>{runtime}</span>min
        </p>
        <p>{overview}</p>
      </div>
    );
  }
  return <></>;
}
