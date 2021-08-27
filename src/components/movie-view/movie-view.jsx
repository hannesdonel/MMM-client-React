import PropTypes from 'prop-types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Spinner, Row,
} from 'react-bootstrap';
import './movie-view.scss';

const MovieView = ({
  movie, userFavorites, username, onBackClick, getUser,
}) => {
  const [buttonState, setButtonState] = useState('');

  const showSpinner = () => {
    const favoriteButton = document.getElementById('favorite-button');
    const spinner = document.getElementById('spinner');
    const heart = document.getElementById('heart');
    spinner.classList.remove('d-none');
    heart.classList.add('d-none');
    favoriteButton.setAttribute('disabled', '');
  };

  const hideSpinner = () => {
    const favoriteButton = document.getElementById('favorite-button');
    const spinner = document.getElementById('spinner');
    const heart = document.getElementById('heart');
    spinner.classList.add('d-none');
    heart.classList.remove('d-none');
    favoriteButton.removeAttribute('disabled', '');
  };

  const checkFavorites = (movieToCheck) => (
    userFavorites.some((favorite) => {
      if (favorite._id !== movieToCheck) {
        return false;
      }
      return true;
    }));

  const handleFavorite = async (favoriteMovie) => {
    showSpinner();
    const accessToken = localStorage.getItem('token');

    if (checkFavorites(favoriteMovie)) {
      try {
        await axios.delete(`https://more-movie-metadata.herokuapp.com/users/${username}/favorites/${favoriteMovie}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        getUser(accessToken);
        hideSpinner();
        setButtonState('outline-warning');
      } catch (error) {
        console.log(error);
        hideSpinner();
      }
    } else {
      try {
        await axios.put(`https://more-movie-metadata.herokuapp.com/users/${username}/favorites/${favoriteMovie}`, {}, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        getUser(accessToken);
        hideSpinner();
        setButtonState('warning');
      } catch (error) {
        console.log(error);
        hideSpinner();
      }
    }
  };

  const markFavorite = () => {
    if (checkFavorites(movie._id)) {
      setButtonState('warning');
    } else {
      setButtonState('outline-warning');
    }
  };

  useEffect(() => {
    markFavorite();
  }, []);

  const listGenres = movie.genre.map((genre, i) => {
    if (movie.genre.length === i + 1) {
      return (
        <Card.Link
          key={genre._id}
          href={`/genres/${genre.name}`}
          className="text-light ml-0"
        >
          <u>{genre.name}</u>
        </Card.Link>
      );
    }
    return (
      <Card.Link
        key={genre._id}
        href={`/genres/${genre.name}`}
        className="text-light ml-0"
      >
        <u>{genre.name}</u>
        {', '}
      </Card.Link>
    );
  });

  const listDirectors = movie.director.map((director, i) => {
    if (movie.director.length === i + 1) {
      return (
        <Card.Link
          key={director._id}
          href={`/directors/${director.name}`}
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
          <Card.Img className="h-100" alt="Movie poster" src={movie.image_url} crossOrigin="anonymous" />
        </Col>
        <Col lg={6}>
          <Card.Body>
            <Card.Title className="text-light">{movie.title}</Card.Title>
            <Card.Subtitle className="mb-4 text-light">{listGenres}</Card.Subtitle>
            <h6 className="mt-4 font-weight-bold text-light">Directors: </h6>
            {listDirectors}
            <h6 className="mt-4 font-weight-bold text-light">Actors: </h6>
            <Card.Text className="text-light">
              {movie.actors.join(', ')}
            </Card.Text>
            <h6 className="mt-4 font-weight-bold text-light">Description: </h6>
            <Card.Text className="text-light">
              {movie.description}
            </Card.Text>
            <Button
              className="button-gutter"
              variant="warning"
              type="button"
              onClick={() => { onBackClick(); }}
            >
              Back
            </Button>
            <Button
              id="favorite-button"
              variant={buttonState}
              type="button"
              onClick={() => { handleFavorite(movie._id); }}
            >
              <Spinner
                id="spinner"
                className="d-none"
                as="span"
                animation="border"
                variant="dark"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden d-none">Loading...</span>
              <span id="heart">&#10084;</span>
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  userFavorites: PropTypes.arrayOf(PropTypes.shape({
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
  username: PropTypes.string.isRequired,
  getUser: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
