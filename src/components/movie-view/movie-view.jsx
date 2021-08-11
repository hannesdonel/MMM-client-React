import React from 'react';

class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img alt="Movie poster" src={movie.image_url} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.title}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.genre.join(', ')}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.description}</span>
        </div>
        <div className="movie-directors">
          <span className="label">Directors: </span>
          <span className="value">{movie.director.join(', ')}</span>
        </div>
        <div className="movie-actors">
          <span className="label">Actors: </span>
          <span className="value">{movie.actors.join(', ')}</span>
        </div>
        <div>
          <button type="button" onClick={() => { onBackClick(null); }}>Back</button>
        </div>
      </div>
    );
  }
}

export default MovieView;
