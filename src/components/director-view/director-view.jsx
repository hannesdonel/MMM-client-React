import React from 'react';
import {
  Button, Card, Row, Col,
} from 'react-bootstrap';
import {
  isDirector, isMovieArray, isString, isFunction,
} from '../../types/index';
import MovieCard from '../movie-card/movie-card';
import './director-view.scss';

const DirectorView = ({
  director, starringMovies, username, userFavorites, getUser, onBackClick,
}) => {
  const listMovies = starringMovies.map((movie) => (
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
            <Card.Title className="text-light">{director.name}</Card.Title>
            <Card.Text className="text-light">
              {director.bio}
            </Card.Text>
            <Card.Text className="text-light">
              <b>Born:</b>
              {' '}
              {director.birth_year}
            </Card.Text>
            <Button variant="warning" type="button" onClick={() => { onBackClick(); }}>Back</Button>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <h5 className="text-light mt-3 px-3">
          Movies written by
          {' '}
          {director.name}
        </h5>
      </Row>
      <Row>
        {listMovies}
      </Row>
    </>
  );
};

DirectorView.propTypes = {
  director: isDirector,
  starringMovies: isMovieArray,
  userFavorites: isMovieArray,
  username: isString,
  getUser: isFunction,
  onBackClick: isFunction,
};

export default DirectorView;
