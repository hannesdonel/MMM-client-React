import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './movie-view.scss';

class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Card className="bg-secondary">
        <Card.Img variant="top" alt="Movie poster" src={movie.image_url} />
        <Card.Body>
          <Card.Title className="text-light">{movie.title}</Card.Title>
          <Card.Subtitle className="mb-4 text-light">{movie.genre[0].name}</Card.Subtitle>
          <h6 className="mt-4 font-weight-bold text-light">Directors: </h6>
          <Card.Text className="text-light">
            {movie.director[0].name}
          </Card.Text>
          <h6 className="mt-4 font-weight-bold text-light">Actors: </h6>
          <Card.Text className="text-light">
            {movie.actors.join(', ')}
          </Card.Text>
          <h6 className="mt-4 font-weight-bold text-light">Description: </h6>
          <Card.Text className="text-light">
            {movie.description}
          </Card.Text>
          <Button className="button-gutter" variant="warning" type="button">Add to Favorites</Button>
          <Button variant="warning" type="button" onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
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
