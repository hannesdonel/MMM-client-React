import PropTypes from 'prop-types';

const { string, func, arrayOf } = PropTypes;

export const isMovie = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
  ).isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
      birth_year: PropTypes.string,
      death_year: PropTypes.string,
    }).isRequired,
  ).isRequired,
  actors: PropTypes.arrayOf(PropTypes.string).isRequired,
}).isRequired;

export const isMovieArray = arrayOf(PropTypes.shape({
  _id: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
  ).isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
      birth_year: PropTypes.string,
      death_year: PropTypes.string,
    }).isRequired,
  ).isRequired,
  actors: PropTypes.arrayOf(PropTypes.string).isRequired,
}).isRequired).isRequired;

export const isUser = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  birth_date: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
      }).isRequired,
    ).isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        bio: PropTypes.string,
        birth_year: PropTypes.string,
        death_year: PropTypes.string,
      }).isRequired,
    ).isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired).isRequired,
  user_name: PropTypes.string.isRequired,
}).isRequired;

export const isGenre = PropTypes.shape({
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}).isRequired;

export const isDirector = PropTypes.shape({
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  birth_year: PropTypes.string.isRequired,
  death_year: PropTypes.string.isRequired,
}).isRequired;

export const isString = string.isRequired;

export const isFunction = func.isRequired;
