import PropTypes from 'prop-types';
import React from 'react';

class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div>
        <div>
          <img alt="Movie poster" src={movie.image_url} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre[0].name}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Directors: </span>
          <span>{movie.director[0].name}</span>
        </div>
        <div>
          <span>Actors: </span>
          <span>{movie.actors.join(', ')}</span>
        </div>
        <div>
          <button type="button" onClick={() => { onBackClick(null); }}>Back</button>
        </div>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
