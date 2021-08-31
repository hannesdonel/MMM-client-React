import React from 'react';
import {
  Button, Card, Col, Row,
} from 'react-bootstrap';
import {
  isGenre, isMovieArray, isString, isFunction,
} from '../../types/index';
import MovieCard from '../movie-card/movie-card';
import './genre-view.scss';

const GenreView = ({
  genre, moviesByGenre, userFavorites, username, getUser, onBackClick,
}) => {
  const listMovies = moviesByGenre.map((movie) => (
    <Col
      key={movie._id}
      className="pb-3 mt-3"
      md={6}
    >
      <MovieCard
        movieData={movie}
        userFavorites={userFavorites}
        username={username}
        getUser={getUser}
      />
    </Col>
  ));

  return (
    <>
      <Row className="justify-content-center pb-3">
        <Card className="bg-secondary mx-3 shadow-lg">
          <Card.Body>
            <Card.Title className="text-light">{genre.name}</Card.Title>
            <Card.Text className="text-light">
              {genre.description}
            </Card.Text>
            <Button variant="warning" type="button" onClick={() => { onBackClick(); }}>Back</Button>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <h5 className="text-light mt-3 px-3">
          Movies with genre
          {' '}
          {genre.name}
        </h5>
      </Row>
      <Row>
        {listMovies}
      </Row>
    </>
  );
};

GenreView.propTypes = {
  genre: isGenre,
  moviesByGenre: isMovieArray,
  userFavorites: isMovieArray,
  username: isString,
  getUser: isFunction,
  onBackClick: isFunction,
};

export default GenreView;
