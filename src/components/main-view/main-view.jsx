import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import RegistrationView from '../registration-view/registration-view';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      signup: null,
      isActive: false,
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://more-movie-metadata.herokuapp.com/movies');
      this.setState({
        movies: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  onLoggedIn(loggedUser) {
    this.setState({
      user: loggedUser,
    });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  backOnSignup(resetSignup) {
    this.setState({
      signup: resetSignup,
    });
  }

  toggleSignup(newUser) {
    this.setState({
      signup: newUser,
    });
  }

  toggleClass(value) {
    this.setState({
      isActive: value,
    });
  }

  render() {
    const {
      movies, selectedMovie, user, signup, isActive,
    } = this.state;

    // Login and registration logic

    if (signup === 'New User') {
      return (
        <Row className="justify-content-md-center align-items-center vh-100">
          <Col md={8}>
            <RegistrationView
              onBackClick={(resetSignup) => { this.backOnSignup(resetSignup); }}
              toggleClass={(value) => { this.toggleClass(value); }}
            />
          </Col>
        </Row>
      );
    }

    if (!user) {
      return (
        <Row className="justify-content-md-center align-items-center vh-100">
          <Col md={8}>
            <LoginView
              signupClick={(newUser) => { this.toggleSignup(newUser); }}
              onLoggedIn={(loggedUser) => { this.onLoggedIn(loggedUser); }}
              toggleClass={isActive}
            />
          </Col>
        </Row>
      );
    }

    // Movie logic

    if (selectedMovie) {
      return (
        <Row className="justify-content-md-center pt-3">
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}
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
              onMovieClick={() => { this.setSelectedMovie(movie); }}
            />
          </Col>
        ))}
      </Row>
    );
  }
}

export default MainView;
