import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  Link,
} from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import queryString from 'query-string';

import notFoundIMG from '../../img/notFound.jpg';
import { getMovieByID } from '../../services/movie-api';

import s from './MovieDetailsPage.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Cast = lazy(
  () => import('../../components/Cast') /* webpackChunkName: "Cast" */,
);
const Reviews = lazy(
  () => import('../../components/Reviews') /* webpackChunkName: "Reviews" */,
);

export default function MovieDetailsPage() {
  const { movieID } = useParams();
  const [movieDetails, setMovieDetails] = useState();
  const { url, path } = useRouteMatch();
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getMovieByID(movieID)
      .then(details => setMovieDetails(details))
      .catch(error => setError(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <h1>{error.message}</h1>;
  }
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
              <Link
                className={s.link}
                to={{
                  pathname: location?.state?.from?.pathname ?? '/',
                  search: location?.state?.from?.search ?? '/',
                }}
              >
                Back
              </Link>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location?.state?.from ?? '/' },
                }}
                className={s.link}
                activeClassName={s.activeLink}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location?.state?.from ?? '/' },
                }}
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
