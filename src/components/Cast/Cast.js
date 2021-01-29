import { useState, useEffect } from 'react';

import { getCastMovie } from '../../services/movie-api';
import ActorCard from '../ActorCard';

export default function Cast({ movieID }) {
  const [cast, setCast] = useState([]);
  useEffect(() => {
    getCastMovie(movieID).then(cast => {
      setCast(cast);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul>
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
