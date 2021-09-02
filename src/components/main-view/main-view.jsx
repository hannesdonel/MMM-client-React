import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row, Col, Spinner, Navbar, Container, Nav, NavDropdown,
} from 'react-bootstrap';
import './main-view.scss';
import {
  BrowserRouter as Router, Link, Route, Switch,
} from 'react-router-dom';

import * as actionCreators from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import LoginView from '../login-view/login-view';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import RegistrationView from '../registration-view/registration-view';
import UserView from '../user-view/user-view';
import SearchBar from '../search-bar/search-bar';
import FavoritesView from '../favorites-view/favorites-view';

// import { isMovieArray } from '../../types/index';

const MainView = () => {
  const dispatch = useDispatch();
  const {
    setMovies, setUserData, setUser, setDirectors, setGenres,
  } = actionCreators;

  const data = useSelector((state) => state);
  const {
    movies, userData, user, directors, genres,
  } = data;
  const favoriteMovies = userData.favorites;
  const [isActive, setIsActive] = useState('false');

  const getMovies = async (token) => {
    try {
      const response = await axios.get('https://more-movie-metadata.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      });
      response.data.sort((a, b) => a.title > b.title);
      dispatch(setMovies(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (token) => {
    try {
      const response = await axios.get(`https://more-movie-metadata.herokuapp.com/users/${localStorage.user}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUserData(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getDirectors = async (token) => {
    try {
      const response = await axios.get('https://more-movie-metadata.herokuapp.com/directors', {
        headers: { Authorization: `Bearer ${token}` },
      });
      response.data.sort((a, b) => a.name > b.name);
      dispatch(setDirectors(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getGenres = async (token) => {
    try {
      const response = await axios.get('https://more-movie-metadata.herokuapp.com/genres', {
        headers: { Authorization: `Bearer ${token}` },
      });
      response.data.sort((a, b) => a.name > b.name);
      dispatch(setGenres(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const onLoggedIn = (authData) => {
    localStorage.setItem('user', authData.user.user_name);
    localStorage.setItem('token', authData.token);
    dispatch(setUser(authData.user.user_name));
    const fetchApi = async () => {
      await getUser(authData.token);
      getMovies(authData.token);
      getDirectors(authData.token);
      getGenres(authData.token);
    };
    fetchApi();
  };

  const onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setUser(null));
  };

  const toggleClass = (value) => {
    setIsActive(value);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (accessToken === null) {
      dispatch(setUser(null));
    } else {
      dispatch(setUser(localStorage.user));
      const fetchApi = async () => {
        await getUser(accessToken);
        getMovies(accessToken);
        getDirectors(accessToken);
        getGenres(accessToken);
      };
      fetchApi();
    }
  }, []);

  // Authentication logic

  const login = (
    <Col lg={8}>
      <LoginView
        onLoggedIn={(loggedUser) => { onLoggedIn(loggedUser); }}
        toggleClass={(value) => { toggleClass(value); }}
        alert={isActive}
      />
    </Col>
  );

  // Directors logic

  const listDirectors = directors.map((director) => (
    <NavDropdown.Item
      key={director._id}
      href={`/directors/${director.name}`}
      className="text-dark"
    >
      {director.name}
    </NavDropdown.Item>
  ));

  // Genres logic

  const listGenres = genres.map((genre) => (
    <NavDropdown.Item
      key={genre._id}
      href={`/genres/${genre.name}`}
      className="text-dark"
    >
      {genre.name}
    </NavDropdown.Item>
  ));

  // Menu logic

  const menu = (
    <Navbar collapseOnSelect className="shadow-sm" expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/" className="text-warning">More Movie Metadata</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Movies</Nav.Link>
            <NavDropdown title="Genres" id="collasible-nav-dropdown">
              {listGenres}
            </NavDropdown>
            <NavDropdown title="Directors" id="collasible-nav-dropdown">
              {listDirectors}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
          <Nav>
            <NavDropdown title={`Welcome ${user}`} id="collasible-nav-dropdown">
              <NavDropdown.Item
                href="/favorites"
                className="text-dark"
              >
                Favorites
              </NavDropdown.Item>
              <NavDropdown.Item
                href={`/users/${userData._id}`}
                className="text-dark"
              >
                Account
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="/"
                className="text-danger"
                onClick={onLoggedOut}
              >
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  return (
    <Router>
      <Row className="justify-content-center align-items-center py-3 mx-0 min-vh-100">
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
                    {menu}
                    <Row className="sticky-top w-100 mx-0">
                      <Container className="mt-3 px-0">
                        <SearchBar />
                      </Container>
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
                  {menu}
                  <Row className="sticky-top w-100">
                    <Container className="mt-3 px-0">
                      <SearchBar />
                    </Container>
                  </Row>
                  <Container className="px-0 mt-3">
                    <Row>
                      <MoviesList
                        getUser={getUser}
                      />
                    </Row>
                  </Container>
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
                    {menu}
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
                  {menu}
                  <Container>
                    <Row className="justify-content-center mt-5">
                      <Col
                        lg={8}
                      >
                        <UserView
                          onBackClick={() => history.goBack()}
                        />
                      </Col>
                    </Row>
                  </Container>
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
                    {menu}
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
                    {menu}
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
                  {menu}
                  <FavoritesView
                    getUser={getUser}
                  />
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
                    {menu}
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
                  {menu}
                  <Container>
                    <Row className="justify-content-center mt-5 pt-3 h-100">
                      <Col lg={9} className="px-0">
                        <MovieView
                          movieTitle={match.params.title}
                          getUser={getUser}
                          onBackClick={() => history.goBack()}
                        />
                      </Col>
                    </Row>
                  </Container>
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
                    {menu}
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
                  {menu}
                  <DirectorView
                    directorName={match.params.name}
                    getUser={getUser}
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
                    {menu}
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
                  {menu}
                  <GenreView
                    genreName={match.params.name}
                    getUser={getUser}
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
