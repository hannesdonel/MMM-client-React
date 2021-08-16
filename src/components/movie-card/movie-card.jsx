import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';

class MovieCard extends React.Component {
  truncate = (str) => (str.length > 100 ? `${str.substring(0, 100)}...` : str)

  render() {
    const { movieData, onMovieClick } = this.props;
    return (
      <Card className="h-100 bg-secondary">
        <Card.Img variant="top" alt="Movie Poster" src={movieData.image_url} />
        <Card.Body>
          <Card.Title className="text-light">{movieData.title}</Card.Title>
          <Card.Text className="text-light truncation">{movieData.description}</Card.Text>
          <Button
            onClick={(movie) => { onMovieClick(movie); }}
            onKeyDown={(movie) => { onMovieClick(movie); }}
            role="button"
            tabIndex="0"
            variant="warning"
            // className="text-warning"
          >
            View
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
