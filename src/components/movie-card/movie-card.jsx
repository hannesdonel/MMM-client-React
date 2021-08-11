import React from 'react';
// import PropTypes from 'prop-types';

class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return (
      <div
        className="movie-card"
        onClick={(movie) => { onMovieClick(movie); }}
        onKeyDown={(movie) => { onMovieClick(movie); }}
        role="button"
        tabIndex="0"
      >
        <span className="movie-card__title">{movieData.title}</span>
      </div>
    );
  }
}
// MovieCard.propTypes = {
//   Title: PropTypes.string.isRequired,
// };

export default MovieCard;
