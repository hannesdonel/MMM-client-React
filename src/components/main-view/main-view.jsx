import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Row, Col, Spinner, Navbar, Container, Nav, NavDropdown, Form,
} from 'react-bootstrap';
import './main-view.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as actionCreators from '../../actions/actions';
// import MoviesList from '../movies-list/movies-list';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import RegistrationView from '../registration-view/registration-view';
import UserView from '../user-view/user-view';

import { isMovieArray } from '../../types/index';

const MainView = () => {
  const dispatch = useDispatch();
  const { setMovies } = bindActionCreators(actionCreators, dispatch);

  const movies = useSelector((state) => state);
  const [displayMovies, setDisplayMovies] = useState([]);
  const [favoriteMovies, setFavorites] = useState([]);
  const [user, setUser] = useState(localStorage.user || null);
  const [directors, setDirectors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isActive, setIsActive] = useState('false');

  const getMovies = async (token) => {
    try {
      const response = await axios.get('https://more-movie-metadata.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      });
      response.data.sort((a, b) => a.title > b.title);
      setMovies(response.data);
      setDisplayMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (token) => {
    try {
      const response = await axios.get(`https://more-movie-metadata.herokuapp.com/users/${localStorage.user}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data);
      setFavorites(response.data.favorites);
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
      setDirectors(response.data);
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
      setGenres(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onLoggedIn = (authData) => {
    localStorage.setItem('user', authData.user.user_name);
    localStorage.setItem('token', authData.token);
    setUser(authData.user.user_name);
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
    setUser(null);
  };

  const toggleClass = (value) => {
    setIsActive(value);
  };

  const handleSearch = (value) => {
    if (value !== '') {
      const result = movies.filter((el) => (
        el.title.toLowerCase().indexOf(value.toLowerCase()) > -1
        || el.director.some(
          (director) => director.name.toLowerCase().indexOf(value.toLowerCase()) > -1,
        ) === true
        || el.genre.some(
          (genre) => genre.name.toLowerCase().indexOf(value.toLowerCase()) > -1,
        ) === true
        || el.actors.some(
          (actor) => actor.toLowerCase().indexOf(value.toLowerCase()) > -1,
        ) === true
      ));
      if (result.length !== 0) {
        setDisplayMovies(result);
      } else {
        setDisplayMovies([]);
      }
    } else {
      setDisplayMovies(movies);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (accessToken === null) {
      setUser(null);
    } else {
      setUser(localStorage.user);
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

  // Movies logic

  const listMovies = displayMovies.map((movie) => (
    <Col
      key={movie._id}
      className="pb-3"
      md={6}
      lg={4}
      xxl={3}
    >
      <MovieCard
        movieData={movie}
        userFavorites={favoriteMovies}
        username={user}
        getUser={getUser}
      />
    </Col>
  ));

  const listFavorites = favoriteMovies.map((movie) => (
    <Col
      key={movie._id}
      className="pb-3"
      md={6}
      lg={4}
      xxl={3}
    >
      <MovieCard
        movieData={movie}
        userFavorites={userData.favorites}
        username={user}
        getUser={getUser}
      />
    </Col>
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
      <Row className="justify-content-center align-items-center pt-3 mx-0 min-vh-100">
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

              if (movies.length === 0 || userData.length === 0) {
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

              // Start View

              return (
                <>
                  {menu}
                  <Container>
                    <Row>
                      <Form.Control
                        className="mt-5 shadow-lg"
                        type="text"
                        placeholder="Search for movie, genre or director"
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </Row>
                  </Container>
                  <Row className="mt-3">
                    {listMovies}
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

            if (userData.length === 0) {
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
                      className="pb-3"
                      lg={8}
                    >
                      <UserView
                        setUser={setUser}
                        userData={userData}
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

            if (userData.length === 0) {
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
                <Row>
                  <h4 className="text-warning text-center mt-5 pt-3">
                    Your favorites
                  </h4>
                </Row>
                <Row className="mt-3">
                  {listFavorites}
                </Row>
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

            if (movies.length === 0 || userData.length === 0) {
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
                <Row className="justify-content-center mt-5 h-100">
                  <Col lg={9} className="px-0">
                    <MovieView
                      movie={movies.find((movie) => movie.title === match.params.title)}
                      userFavorites={favoriteMovies}
                      username={user}
                      getUser={getUser}
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

            if (directors.length === 0 || userData.length === 0) {
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
                <Row className="justify-content-center mt-5">
                  <Col
                    className="pb-3 justify-content-center"
                    lg={8}
                  >
                    <DirectorView
                      director={
                        directors.find((director) => director.name === match.params.name)
                      }
                      starringMovies={
                        movies.filter((movie) => {
                          const output = movie.director.some(({ name }) => name
                            === match.params.name);
                          return output;
                        })
                      }
                      userFavorites={favoriteMovies}
                      username={user}
                      getUser={getUser}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                </Row>
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
                <Row className="justify-content-center mt-5">
                  <Col
                    className="pb-3"
                    lg={8}
                  >
                    <GenreView
                      genre={
                        genres.find((genre) => genre.name === match.params.name)
                      }
                      moviesByGenre={
                        movies.filter((movie) => {
                          const output = movie.genre.some(({ name }) => name
                            === match.params.name);
                          return output;
                        })
                      }
                      userFavorites={favoriteMovies}
                      username={user}
                      getUser={getUser}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                </Row>
              </>
            );
          }}
          />
        </Switch>
      </Row>
    </Router>
  );
};

MainView.propTypes = {
  movies: isMovieArray,
};

export default MainView;
