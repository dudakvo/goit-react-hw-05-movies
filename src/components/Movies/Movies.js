import { movieSearchByQuery } from '../../services/movie-api';

export default function Movies() {
  movieSearchByQuery('Borat');
  return (
    <>
      <h1>Movies page</h1>
    </>
  );
}
