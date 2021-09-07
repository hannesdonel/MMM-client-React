import * as actions from '../actions/actionTypes';

const initialState = {
  movies: [],
  filterString: '',
  userData: { favorites: [] },
  user: localStorage.userName || null,
  directors: [],
  genres: [],
};

const movieApp = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_FILTER:

      return {
        ...state,
        filterString: action.payload,
      };
    case actions.SET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case actions.SET_USERDATA:
      return {
        ...state,
        userData: action.payload,
      };
    case actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actions.SET_DIRECTORS:
      return {
        ...state,
        directors: action.payload,
      };
    case actions.SET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    default:
      return state;
  }
};

export default movieApp;
