//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

//https://image.tmdb.org/t/p/w500/ получить картинку

const API_KEY = 'f76df85c86f4c3253e784768d1d2b67c';
const BASE_URL = 'https://api.themoviedb.org/3/';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

function getmovieObject(resultJSON) {
  const filmArray = resultJSON.results.map(film => ({
    id: film.id,
    genre: getNamesGenre(film.genre_ids),
    popularity: film.popularity,
    title: film.title,
    posterPath: film.poster_path
      ? `${IMG_BASE_URL}${film.poster_path}`
      : 'not found',
  }));

  // const returnObject = {
  //   totalPages: resultJSON.total_pages,
  //   movies: filmArray,
  // };
  return {
    totalPages: resultJSON.total_pages,
    movies: filmArray,
  };
}

export async function getTrendinMovies(page = 1) {
  const request_url = `${BASE_URL}trending/all/day?api_key=${API_KEY}&page=${page}`;
  const fetchResponse = await fetch(request_url);
  if (fetchResponse.status !== 200) {
    throw new Error(
      `Некоректний результат запиту status code: ${fetchResponse.status}`,
    );
  }
  const movieJSON = await fetchResponse.json();

  return getmovieObject(movieJSON);
}

export async function getNamesGenre(genreIDArray) {
  //https://api.themoviedb.org/3/ genre/movie/list?api_key=<<api_key>>&language=en-US
  const request_url = `${BASE_URL}genre/movie/list?api_key=${API_KEY}`;
  const fetchResponse = await fetch(request_url);

  if (fetchResponse.status !== 200) {
    throw new Error(
      `Некоректний результат запиту status code: ${fetchResponse.status}`,
    );
  }

  const genresJSON = await fetchResponse.json();
  const genreNames = genreIDArray.map(genre => {
    const genreObject = genresJSON.genres.find(genreObject => {
      return genreObject.id === genre;
    });

    return genreObject ? genreObject.name : null;
  });
  return genreNames;
}

export async function movieSearchByQuery(queryString, page = 1) {
  //https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

  const request_url = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${queryString}`;
  console.log(
    '🚀 ~ file: movie-api.js ~ line 62 ~ movieSearchByQuery ~ request_url',
    request_url,
  );

  const fetchResponse = await fetch(request_url);
  if (fetchResponse.status !== 200) {
    throw new Error(
      `Некоректний результат запиту status code: ${fetchResponse.status}`,
    );
  }
  const movieJSON = await fetchResponse.json();
  return getmovieObject(movieJSON);
}

export async function getMovieByID(movieID) {
  //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
  const request_url = `${BASE_URL}movie/${movieID}?api_key=${API_KEY}&language=en-US`;
}

export async function getCastMovie(movieID) {
  //https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
  const request_url = `${BASE_URL}movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`;
}

export async function getReviews({ movieID, page = 1 }) {
  //https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1
  const request_url = `${BASE_URL}movie/${movieID}/reviews?api_key=<<api_key>>&language=en-US&page=${page}`;
}
