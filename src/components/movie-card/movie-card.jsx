import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

class MovieCard extends React.Component {
  truncate = (str) => (str.length > 100 ? `${str.substring(0, 100)}...` : str)

  render() {
    const { movieData } = this.props;
    return (
      <Card className="h-100 bg-secondary">
        <Card.Img variant="top" alt="Movie Poster" src={movieData.image_url} />
        <Card.Body>
          <Card.Title className="text-light">{movieData.title}</Card.Title>
          <Card.Text className="text-light truncation">{movieData.description}</Card.Text>
          <Link to={`/movies/${movieData.title}`}>
            <Button
              role="button"
              tabIndex="0"
              variant="warning"
            >
              Open
            </Button>
          </Link>
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
};

export default MovieCard;
