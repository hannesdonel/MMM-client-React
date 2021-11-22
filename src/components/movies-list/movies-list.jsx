import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';
import { isMovieArrayNotRequired } from '../../types';
import './movies-list.scss';

const MoviesList = ({ favorites }) => {
  const {
    movies, filterString,
  } = useSelector((state) => state);

  let filteredMovies = favorites || movies;

  // Filters the movies to be displayed for search input and filter settings
  if (filterString !== '') {
    filteredMovies = movies.filter((el) => (
      el.title.toLowerCase().indexOf(filterString.toLowerCase()) > -1
            || el.director.some(
              (director) => director.name.toLowerCase().indexOf(filterString.toLowerCase()) > -1,
            ) === true
            || el.genre.some(
              (genre) => genre.name.toLowerCase().indexOf(filterString.toLowerCase()) > -1,
            ) === true
            || el.actors.some(
              (actor) => actor.toLowerCase().indexOf(filterString.toLowerCase()) > -1,
            ) === true
    ));
  }

  if (filterString !== '' && filteredMovies.length === 0) {
    return (
      <Container className="d-flex justify-content-center">
        <Row className="nothing-found justify-content-center align-items-center vh-100 w-100 px-3">
          <Col className="text-light text-center">
            Sorry, nothing found for
            {' '}
            &quot;
            {filterString}
            &quot;!
          </Col>
        </Row>
      </Container>
    );
  }

  return filteredMovies.map((movie) => (
    <Col
      key={movie._id}
      className="pb-3"
      md={6}
      lg={4}
      xxl={3}
    >
      <MovieCard
        className="h-100"
        movieData={movie}
      />
    </Col>
  ));
};

MoviesList.propTypes = {
  favorites: isMovieArrayNotRequired,
};

export default MoviesList;
