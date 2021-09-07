import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Spinner, Row,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFilter } from '../../actions/actions';
import favoriteServices from '../../services/favorite-services';
import {
  isString, isFunction,
} from '../../types/index';
import './movie-view.scss';

const MovieView = ({
  movieTitle, onBackClick,
}) => {
  const [buttonState, setButtonState] = useState('');

  const dispatch = useDispatch();

  const { movies, userData } = useSelector((state) => state);
  const movieData = movies.find((movieSearch) => movieSearch.title === movieTitle);
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

  const listGenres = movieData.genre.map((genre, i) => {
    if (movieData.genre.length === i + 1) {
      return (
        <Card.Link
          key={genre._id}
          as={Link}
          to={`/genres/${genre.name}`}
          onClick={() => dispatch(setFilter(genre.name))}
          className="text-light ml-0"
        >
          <u>{genre.name}</u>
        </Card.Link>
      );
    }
    return (
      <Card.Link
        key={genre._id}
        as={Link}
        to={`/genres/${genre.name}`}
        onClick={() => dispatch(setFilter(genre.name))}
        className="text-light ml-0"
      >
        <u>{genre.name}</u>
        {', '}
      </Card.Link>
    );
  });

  const listDirectors = movieData.director.map((director, i) => {
    if (movieData.director.length === i + 1) {
      return (
        <Card.Link
          key={director._id}
          as={Link}
          to={`/directors/${director.name}`}
          onClick={() => dispatch(setFilter(director.name))}
          className="text-light ml-0"
        >
          <u>{director.name}</u>
        </Card.Link>
      );
    }
    return (
      <Card.Link
        key={director._id}
        href={`/directors/${director.name}`}
        className="text-light ml-0"
      >
        <u>{director.name}</u>
        {', '}
      </Card.Link>
    );
  });

  return (
    <Card className="bg-secondary shadow-lg">
      <Row>
        <Col lg={6}>
          <Card.Img className="h-100" alt={movieData.title} src={movieData.image_url} crossOrigin="anonymous" />
        </Col>
        <Col lg={6}>
          <Card.Body>
            <Card.Title className="text-light">{movieData.title}</Card.Title>
            <Card.Subtitle className="mb-4 text-light">{listGenres}</Card.Subtitle>
            <h6 className="mt-4 font-weight-bold text-light">Directors: </h6>
            {listDirectors}
            <h6 className="mt-4 font-weight-bold text-light">Actors: </h6>
            <Card.Text className="text-light">
              {movieData.actors.join(', ')}
            </Card.Text>
            <h6 className="mt-4 font-weight-bold text-light">Description: </h6>
            <Card.Text className="text-light">
              {movieData.description}
            </Card.Text>
            <Button
              className="button-gutter"
              variant="warning"
              type="button"
              onClick={() => onBackClick()}
            >
              Back
            </Button>
            <Button
              id={movieData._id}
              variant={buttonState}
              className="favorite-button"
              type="button"
              onClick={() => { handleFavorite(movieData._id); }}
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
        </Col>
      </Row>
    </Card>
  );
};

MovieView.propTypes = {
  movieTitle: isString,
  onBackClick: isFunction,
};

export default MovieView;
