import React, { useEffect, useState } from 'react';
import axios from 'redaxios';
import { Row, Col, Spinner } from 'react-bootstrap';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import RegistrationView from '../registration-view/registration-view';

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
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

  // Authentication logic

  const login = (
    <Col md={8}>
      <LoginView
        onLoggedIn={(loggedUser) => { onLoggedIn(loggedUser); }}
        toggleClass={(value) => { toggleClass(value); }}
        alert={isActive}
      />
    </Col>
  );

  return (
    <Router>
      <Row className="justify-content-md-center align-items-center pt-3 min-vh-100">

        {/* Main View */}

        <Route
          exact
          path="/"
          render={() => {
            // Authentication

            if (!user) {
              return login;
            }

            // Loading View

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

            // Start View

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

        {/* Registration */}

        <Route
          path="/registration"
          /* eslint-disable-next-line */
          render={({ history }) => {
            return (
              <Col md={8}>
                <RegistrationView
                  toggleClass={(value) => { toggleClass(value); }}
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
        />

        {/* Movie View */}

        <Route
          path="/movies/:title"
          /* eslint-disable-next-line */
          render={({ match, history }) => {
            // Authentication

            if (!user) {
              return login;
            }

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
};

export default MainView;
