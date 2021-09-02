import * as actions from './actionTypes';

export const setMovies = (movieArray) => ({
  type: actions.SET_MOVIES,
  payload: movieArray,
});

export const setFilter = (value) => ({
  type: actions.SET_FILTER,
  payload: value,
});

export const setUserData = (data) => ({
  type: actions.SET_USERDATA,
  payload: data,
});

export const setUser = (user) => ({
  type: actions.SET_USER,
  payload: user,
});

export const setDirectors = (directors) => ({
  type: actions.SET_DIRECTORS,
  payload: directors,
});

export const setGenres = (genres) => ({
  type: actions.SET_GENRES,
  payload: genres,
});
