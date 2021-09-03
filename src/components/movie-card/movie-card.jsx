import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  isMovie, isFunction,
} from '../../types/index';
import './movie-card.scss';

const MovieCard = ({
  movieData, getUser,
}) => {
  const [buttonState, setButtonState] = useState('');

  const { userData } = useSelector((state) => state);
  const userFavorites = userData.favorites;
  const userId = userData._id;

  const heartId = `heart${movieData._id}`;
  const spinnerId = `spinner${movieData._id}`;

  const showSpinner = () => {
    const favoriteButton = document.getElementById(movieData._id);
    const spinner = document.getElementById(spinnerId);
    const heart = document.getElementById(heartId);
    spinner.classList.remove('d-none');
    heart.classList.add('d-none');
    favoriteButton.setAttribute('disabled', '');
  };

  const hideSpinner = () => {
    const favoriteButton = document.getElementById(movieData._id);
    const spinner = document.getElementById(spinnerId);
    const heart = document.getElementById(heartId);
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
        await axios.delete(`https://more-movie-metadata.herokuapp.com/users/${userId}/favorites/${favoriteMovie}`, {
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
        await axios.put(`https://more-movie-metadata.herokuapp.com/users/${userId}/favorites/${favoriteMovie}`, {}, {
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
    if (checkFavorites(movieData._id)) {
      setButtonState('warning');
    } else {
      setButtonState('outline-warning');
    }
  };

  useEffect(() => {
    markFavorite();
  }, []);

  return (
    <Card className="h-100 bg-secondary shadow">
      <Link className="h-100" to={`/movies/${movieData.title}`}>
        <Card.Img className="h-100" variant="top" alt={movieData.title} src={movieData.image_url} crossOrigin="anonymous" />
      </Link>
      <Card.Body>
        <Link to={`/movies/${movieData.title}`}>
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
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: isMovie,
  getUser: isFunction,
};

export default MovieCard;
