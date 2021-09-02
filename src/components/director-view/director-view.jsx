import React, { useEffect } from 'react';
import {
  Button, Card, Row, Container,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../actions/actions';
import {
  isString, isFunction,
} from '../../types/index';
import MoviesList from '../movies-list/movies-list';
import './director-view.scss';

const DirectorView = ({
  directorName, getUser, onBackClick,
}) => {
  const dispatch = useDispatch();
  const { directors } = useSelector((state) => state);

  const director = directors.find((directorSearch) => directorSearch.name === directorName);
  useEffect(() => dispatch(setFilter(director.name)), []);

  return (
    <>
      <Row className="justify-content-center pb-3 mt-5 pt-3">
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
      <Row className="my-4">
        <h5 className="text-light">
          Movies written by
          {' '}
          {director.name}
        </h5>
      </Row>
      <Container className="px-0">
        <Row>
          <MoviesList
            getUser={getUser}
          />
        </Row>
      </Container>
    </>
  );
};

DirectorView.propTypes = {
  getUser: isFunction,
  directorName: isString,
  onBackClick: isFunction,
};

export default DirectorView;
