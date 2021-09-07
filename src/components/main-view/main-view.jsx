import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row, Col, Spinner,
} from 'react-bootstrap';
import './main-view.scss';
import {
  BrowserRouter as Router, Link, Route, Switch,
} from 'react-router-dom';

import { setFilter, setUser } from '../../actions/actions';
import fetchServices from '../../services/fetch-services';

import NavBar from '../nav-bar/nav-bar';
import MoviesList from '../movies-list/movies-list';
import LoginView from '../login-view/login-view';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import RegistrationView from '../registration-view/registration-view';
import UserView from '../user-view/user-view';
import SearchBar from '../search-bar/search-bar';
import FavoritesView from '../favorites-view/favorites-view';

const MainView = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state);
  const {
    movies, userData, user, directors, genres,
  } = data;
  const favoriteMovies = userData.favorites;
  const [isActive, setIsActive] = useState('false');

  const {
    getUser, getMovies, getDirectors, getGenres,
  } = fetchServices();

  const toggleClass = (value) => {
    setIsActive(value);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (accessToken === null) {
      dispatch(setUser(null));
    } else {
      const fetchApi = async () => {
        await getUser(accessToken);
        getMovies(accessToken);
        getDirectors(accessToken);
        getGenres(accessToken);
      };
      setFilter('');
      fetchApi();
    }
  }, []);

  // Authentication logic

  const login = (
    <Col lg={8}>
      <LoginView
        toggleClass={(value) => { toggleClass(value); }}
        alert={isActive}
      />
    </Col>
  );

  return (
    <Router>
      <Row className="justify-content-center align-items-center py-3 min-vh-100">
        <Switch>
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

              if (movies.length === 0 || Object.entries(userData).length < 5) {
                return (
                  <>
                    <NavBar />
                    <Row className="sticky-top w-100">
                      <SearchBar />
                    </Row>
                    <Row className="spinner-container justify-content-center align-items-center vh-100">
                      <Col className="text-center" lg={8}>
                        <Spinner
                          animation="border"
                          role="status"
                          aria-hidden="true"
                          variant="light"
                        >
                          <span className="visually-hidden d-none">Loading...</span>
                        </Spinner>
                      </Col>
                    </Row>
                  </>
                );
              }

              // Start View

              return (
                <>
                  <NavBar />
                  <Row className="sticky-top w-100">
                    <SearchBar />
                  </Row>
                  <Row className="mt-3">
                    <MoviesList />
                  </Row>
                </>
              );
            }}
          />

          {/* Registration */}

          <Route
            path="/registration"
            /* eslint-disable-next-line */
            render={({ history }) => {
              return (
                <Col lg={8}>
                  <RegistrationView
                    toggleClass={(value) => { toggleClass(value); }}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/* User View */}

          <Route
            path="/users/:id"
            /* eslint-disable-next-line */
            render={({ history }) => {
              // Authentication

              if (!user) {
                return login;
              }

              // Loading View

              if (Object.entries(userData).length < 5) {
                return (
                  <>
                    <NavBar />
                    <Row className="justify-content-center mt-5">
                      <Col className="text-center" lg={8}>
                        <Spinner
                          animation="border"
                          role="status"
                          aria-hidden="true"
                          variant="light"
                        >
                          <span className="visually-hidden d-none">Loading...</span>
                        </Spinner>
                      </Col>
                    </Row>
                  </>
                );
              }

              return (
                <>
                  <NavBar />
                  <Row className="justify-content-center mt-5">
                    <Col
                      lg={8}
                    >
                      <UserView
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  </Row>
                </>
              );
            }}
          />

          {/* Favorites View */}

          <Route
            path="/favorites"
            /* eslint-disable-next-line */
            render={({ history }) => {
              // Authentication

              if (!user) {
                return login;
              }

              // Loading View

              if (Object.entries(userData).length < 5) {
                return (
                  <>
                    <NavBar />
                    <Row className="sticky-top justify-content-center w-100 mx-0">
                      <h4 className="text-warning mt-4 pt-5">
                        Your favorites
                      </h4>
                    </Row>
                    <Row className="spinner-container justify-content-center align-items-center vh-100">
                      <Col g={8}>
                        <Spinner
                          animation="border"
                          role="status"
                          aria-hidden="true"
                          variant="light"
                        >
                          <span className="visually-hidden d-none">Loading...</span>
                        </Spinner>
                      </Col>
                    </Row>
                  </>
                );
              }

              if (favoriteMovies.length === 0) {
                return (
                  <>
                    <NavBar />
                    <Row className="sticky-top justify-content-center w-100 mx-0">
                      <h4 className="text-warning mt-4 pt-5">
                        Your favorites
                      </h4>
                    </Row>
                    <Row className="user-view__loading align-items-center text-light vh-100">
                      <Col>
                        You have no favorite movies yet. Browse&#160;
                        <Link to="/" className="text-warning">
                          here
                        </Link>
                        .
                      </Col>
                    </Row>
                  </>
                );
              }

              return (
                <>
                  <NavBar />
                  <FavoritesView />
                </>
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

              // Loading View

              if (movies.length === 0 || Object.entries(userData).length < 5) {
                return (
                  <>
                    <NavBar />
                    <Row className="justify-content-center mt-5">
                      <Col className="text-center" lg={8}>
                        <Spinner
                          animation="border"
                          role="status"
                          aria-hidden="true"
                          variant="light"
                        >
                          <span className="visually-hidden d-none">Loading...</span>
                        </Spinner>
                      </Col>
                    </Row>
                  </>
                );
              }

              return (
                <>
                  <NavBar />
                  <Row className="justify-content-center mt-5 pt-3 h-100">
                    <Col lg={9}>
                      <MovieView
                        movieTitle={match.params.title}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  </Row>
                </>
              );
            }}
          />

          {/* Director View */}

          <Route
            path="/directors/:name"
            /* eslint-disable-next-line */
            render={({ match, history }) => {
              // Authentication

              if (!user) {
                return login;
              }

              // Loading View

              if (directors.length === 0 || movies.length === 0) {
                return (
                  <>
                    <NavBar />
                    <Row className="justify-content-center mt-5">
                      <Col className="text-center" lg={8}>
                        <Spinner
                          animation="border"
                          role="status"
                          aria-hidden="true"
                          variant="light"
                        >
                          <span className="visually-hidden d-none">Loading...</span>
                        </Spinner>
                      </Col>
                    </Row>
                  </>
                );
              }

              return (
                <>
                  <NavBar />
                  <DirectorView
                    directorName={match.params.name}
                    onBackClick={() => history.goBack()}
                  />
                </>
              );
            }}
          />

          {/* Genre View */}

          <Route
            path="/genres/:name"
            /* eslint-disable-next-line */
            render={({ match, history }) => {
              // Authentication

              if (!user) {
                return login;
              }

              // Loading View

              if (genres.length === 0 || userData.length === 0) {
                return (
                  <>
                    <NavBar />
                    <Row className="justify-content-center mt-5">
                      <Col className="text-center" lg={8}>
                        <Spinner
                          animation="border"
                          role="status"
                          aria-hidden="true"
                          variant="light"
                        >
                          <span className="visually-hidden d-none">Loading...</span>
                        </Spinner>
                      </Col>
                    </Row>
                  </>
                );
              }

              return (
                <>
                  <NavBar />
                  <GenreView
                    genreName={match.params.name}
                    onBackClick={() => history.goBack()}
                  />
                </>
              );
            }}
          />
        </Switch>
      </Row>
    </Router>
  );
};

export default MainView;
