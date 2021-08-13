import React from 'react';
import axios from 'axios';

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
        <RegistrationView
          onBackClick={(resetSignup) => { this.backOnSignup(resetSignup); }}
          toggleClass={(value) => { this.toggleClass(value); }}
        />
      );
    }

    if (!user) {
      return (
        <LoginView
          signupClick={(newUser) => { this.toggleSignup(newUser); }}
          onLoggedIn={(loggedUser) => { this.onLoggedIn(loggedUser); }}
          toggleClass={isActive}
        />
      );
    }

    // Movie logic

    if (selectedMovie) {
      return (
        <MovieView
          movie={selectedMovie}
          onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}
        />
      );
    }

    if (movies.length === 0) {
      return (
        <div />
      );
    }

    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movieData={movie}
            onMovieClick={() => { this.setSelectedMovie(movie); }}
          />
        ))}
      </div>
    );
  }
}

export default MainView;
