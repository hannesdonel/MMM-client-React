import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <RegistrationView
        onBackClick={(resetSignup) => { backOnSignup(resetSignup); }}
        toggleClass={(value) => { toggleClass(value); }}
      />
    );
  }

  if (!user) {
    return (
      <LoginView
        signupClick={(newUser) => { toggleSignup(newUser); }}
        onLoggedIn={(loggedUser) => { onLoggedIn(loggedUser); }}
        toggleClass={isActive}
      />
    );
  }

  // Movie logic

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={(newSelectedMovie) => { setMovie(newSelectedMovie); }}
      />
    );
  }

  if (movies.length === 0) {
    return (
      <div className="main-view" />
    );
  }

  return (
    <div className="main-view">
      {movies.map((movie) => (
        <MovieCard
          hey="It's just a test"
          key={movie._id}
          movieData={movie}
          onMovieClick={() => { setMovie(movie); }}
        />
      ))}
    </div>
  );
};

export default MainView;
