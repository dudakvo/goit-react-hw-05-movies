import { useParams, NavLink, Route, useRouteMatch } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';

import notFoundIMG from '../../img/notFound.jpg';
import { getMovieByID } from '../../services/movie-api';
//import Cast from '../Cast';
//import Reviews from '../Reviews';

import s from './MovieDetailsPage.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Cast = lazy(() => import('../Cast') /* webpackChunkName: "Cast" */);
const Reviews = lazy(
  () => import('../Reviews') /* webpackChunkName: "Reviews" */,
);

export default function MovieDetailsPage() {
  const { movieID } = useParams();
  const [movieDetails, setMovieDetails] = useState();
  const { url, path } = useRouteMatch();

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
      <div className={s.detailsContainer}>
        <div className={s.movie_details}>
          <h1>{title}</h1>
          {poster ? (
            <img src={poster} alt={title} height="300px" />
          ) : (
            <img src={notFoundIMG} alt={title} height="300px" />
          )}
          <h2>{tagline}</h2>
          {homepage && <a href={homepage}>{homepage}</a>}
          <p>
            Genre: <span className={s.value}>{genres.toString()}</span>
          </p>
          <p>
            <span className={s.vote}>
              vote:<span className={s.value}>{vote}</span>
            </span>
            <span className={s.runtime}>
              runtime:<span className={s.value}>{runtime}</span>min
            </span>
          </p>
          <p>{overview}</p>
          <ul className={s.nav}>
            <li>
              <NavLink
                to={`${url}/cast`}
                className={s.link}
                activeClassName={s.activeLink}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${url}/reviews`}
                className={s.link}
                activeClassName={s.activeLink}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={s.movie_details}>
          <Suspense fallback={<Loader type="Puff" />}>
            <Route path={`${path}/cast`} exact>
              <Cast movieID={movieID} />
            </Route>
            <Route path={`${path}/reviews`} exact>
              <Reviews movieID={movieID} />
            </Route>
          </Suspense>
        </div>
      </div>
    );
  }
  return <></>;
}
