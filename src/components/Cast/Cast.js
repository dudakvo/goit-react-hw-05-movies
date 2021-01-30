import { useState, useEffect } from 'react';

import { getCastMovie } from '../../services/movie-api';
import ActorCard from '../ActorCard';

import s from './Cast.module.css';

export default function Cast({ movieID }) {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    getCastMovie(movieID)
      .then(cast => {
        setCast(cast);
      })
      .catch(error => setError(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <h1>error.message</h1>;
  }
  return (
    <ul className={s.castGallery}>
      {cast.length > 1 &&
        cast.map(actor => {
          const { name, profile, id, character } = actor;
          return (
            <ActorCard
              key={id}
              name={name}
              profile={profile}
              character={character}
            />
          );
        })}
    </ul>
  );
}
