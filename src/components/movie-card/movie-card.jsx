import PropTypes from 'prop-types';
import React from 'react';

class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return (
      <div
        onClick={(movie) => { onMovieClick(movie); }}
        onKeyDown={(movie) => { onMovieClick(movie); }}
        role="button"
        tabIndex="0"
      >
        <span>{movieData.title}</span>
      </div>
    );
  }
}
MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
