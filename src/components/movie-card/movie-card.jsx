import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import favoriteServices from '../../services/favorite-services';
import { isMovie } from '../../types/index';
import './movie-card.scss';

const MovieCard = ({ movieData }) => {
  const [buttonState, setButtonState] = useState('');

  const { userData } = useSelector((state) => state);
  const userFavorites = userData.favorites;
  const userId = userData._id;
  const heartId = `heart${movieData._id}`;
  const spinnerId = `spinner${movieData._id}`;

  const favoriteServicesData = {
    movieData,
    spinnerId,
    heartId,
    userFavorites,
    userId,
    setButtonState,
  };

  const { markFavorite, handleFavorite } = favoriteServices(favoriteServicesData);

  useEffect(() => {
    markFavorite();
  }, [userData.favorites]);

  return (
    <Card className="h-100 bg-secondary shadow">
      <Link className="h-100" to={`/movies/${movieData.title}`}>
        <Card.Img className="h-100" variant="top" alt={movieData.title} src={movieData.image_url} crossOrigin="anonymous" />
      </Link>
      <Card.Body>
        <Link className="movie-title" to={`/movies/${movieData.title}`}>
          <Card.Title className="text-light">{movieData.title}</Card.Title>
        </Link>
        <Card.Text className="text-light truncation">{movieData.description}</Card.Text>
        <Link to={`/movies/${movieData.title}`}>
          <Button
            className="button-gutter"
            role="button"
            tabIndex="0"
            variant="warning"
          >
            Open
          </Button>
        </Link>
        <Button
          id={movieData._id}
          variant={buttonState}
          className="favorite-button"
          type="button"
          onClick={() => { (handleFavorite(movieData._id)); }}
        >
          <Spinner
            id={spinnerId}
            className="d-none"
            as="span"
            animation="border"
            variant="dark"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden d-none">Loading...</span>
          <span id={heartId}>&#10084;</span>
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: isMovie,
};

export default MovieCard;
