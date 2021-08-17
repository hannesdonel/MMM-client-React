import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import RegistrationView from '../registration-view/registration-view';

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [signup, setSignUp] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://more-movie-metadata.herokuapp.com/movies');
        setMovies(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onLoggedIn = (loggedUser) => {
    setUser(loggedUser);
  };

  const setMovie = (newSelectedMovie) => {
    setSelectedMovie(newSelectedMovie);
  };

  const backOnSignup = (resetSignup) => {
    setSignUp(resetSignup);
  };

  const toggleSignup = (newUser) => {
    setSignUp(newUser);
  };

  const toggleClass = (value) => {
    setIsActive(value);
  };

  // Login and registration logic

  if (signup === 'New User') {
    return (
      <Row className="justify-content-md-center align-items-center min-vh-100">
        <Col md={8}>
          <RegistrationView
            onBackClick={(resetSignup) => { backOnSignup(resetSignup); }}
            toggleClass={(value) => { toggleClass(value); }}
          />
        </Col>
      </Row>
    );
  }

  if (!user) {
    return (
      <Row className="justify-content-md-center align-items-center min-vh-100">
        <Col md={8}>
          <LoginView
            signupClick={(newUser) => { toggleSignup(newUser); }}
            onLoggedIn={(loggedUser) => { onLoggedIn(loggedUser); }}
            toggleClass={isActive}
          />
        </Col>
      </Row>
    );
  }

  if (selectedMovie) {
    return (
      <Row className="justify-content-md-center align-items-center py-3 min-vh-100">
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => { setMovie(newSelectedMovie); }}
          />
        </Col>
      </Row>
    );
  }

  if (movies.length === 0) {
    return (
      <div />
    );
  }

  return (
    <Row className="justify-content-md-center pt-3">
      {movies.map((movie) => (
        <Col
          key={movie._id}
          className="pb-3"
          md={6}
          lg={4}
          xxl={3}
        >
          <MovieCard
            movieData={movie}
            onMovieClick={() => { setMovie(movie); }}
          />
        </Col>
      ))}
    </Row>
  );
};

export default MainView;
