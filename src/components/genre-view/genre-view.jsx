import React from 'react';
import {
  Button, Card, Row, Container,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../actions/actions';
import {
  isString, isFunction,
} from '../../types/index';
import MoviesList from '../movies-list/movies-list';
import './genre-view.scss';

const GenreView = ({
  genreName, onBackClick,
}) => {
  const { genres } = useSelector((state) => state);
  const dispatch = useDispatch();

  const genre = genres.find((genreSearch) => genreSearch.name === genreName);

  return (
    <>
      <Row className="justify-content-center pb-3 mt-5 pt-3">
        <Card className="bg-secondary mx-3 shadow-lg">
          <Card.Body>
            <Card.Title className="text-light">{genre.name}</Card.Title>
            <Card.Text className="text-light">
              {genre.description}
            </Card.Text>
            <Button variant="warning" type="button" onClick={() => { dispatch(setFilter('')); onBackClick(); }}>Back</Button>
          </Card.Body>
        </Card>
      </Row>
      <Row className="my-4">
        <h5 className="text-light">
          Movies with genre
          {' '}
          {genre.name}
        </h5>
      </Row>
      <Container className="px-0">
        <Row>
          <MoviesList />
        </Row>
      </Container>
    </>
  );
};

GenreView.propTypes = {
  genreName: isString,
  onBackClick: isFunction,
};

export default GenreView;
