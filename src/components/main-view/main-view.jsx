import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Spinner } from 'react-bootstrap';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import RegistrationView from '../registration-view/registration-view';

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [signup, setSignUp] = useState(null);
  const [isActive, setIsActive] = useState('false');

  const getMovies = async (token) => {
    try {
      const response = await axios.get('https://more-movie-metadata.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onLoggedIn = (authData) => {
    setUser(authData);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.user_name);
    getMovies(authData.token);
  };

  /* eslint-disable-next-line */
  const onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
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

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (accessToken === null) {
      setUser(null);
    } else {
      setUser(localStorage.user);
      getMovies(accessToken);
    }
  }, []);

  // Authentication and registration logic

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
            toggleClass={(value) => { toggleClass(value); }}
            alert={isActive}
          />
        </Col>
      </Row>
    );
  }

  // Movie logic

  return (
    <Router>
      <Row className="justify-content-md-center align-items-center pt-3 min-vh-100">
        <Route
          exact
          path="/"
          render={() => {
            if (movies.length === 0) {
              return (
                <Col className="text-center" md={8}>
                  <Spinner
                    animation="border"
                    role="status"
                    aria-hidden="true"
                    variant="light"
                  >
                    <span className="visually-hidden d-none">Loading...</span>
                  </Spinner>
                </Col>
              );
            }

            return (
              movies.map((movie) => (
                <Col
                  key={movie._id}
                  className="pb-3"
                  md={6}
                  lg={4}
                  xxl={3}
                >
                  <MovieCard
                    movieData={movie}
                  />
                </Col>
              )));
          }}
        />
        <Route
          path="/movies/:title"
          /* eslint-disable-next-line */
          render={({ match, history }) => {
            return (
              <Col
                className="pb-3"
                md={8}
              >
                <MovieView
                  movie={movies.find((movie) => movie.title === match.params.title)}
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
        />
      </Row>
    </Router>
  );

/*
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
  */
};

export default MainView;
