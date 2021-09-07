import React from 'react';
import {
  Button, Card, Row,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../actions/actions';
import {
  isString, isFunction,
} from '../../types/index';
import MoviesList from '../movies-list/movies-list';
import './director-view.scss';

const DirectorView = ({
  directorName, onBackClick,
}) => {
  const { directors } = useSelector((state) => state);
  const dispatch = useDispatch();

  const director = directors.find((directorSearch) => directorSearch.name === directorName);

  return (
    <>
      <Row className="justify-content-center px-4 pb-3 mt-5 pt-3">
        <Card className="bg-secondary shadow-lg">
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
            <Button variant="warning" type="button" onClick={() => { dispatch(setFilter('')); onBackClick(); }}>Back</Button>
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
      <Row>
        <MoviesList />
      </Row>
    </>
  );
};

DirectorView.propTypes = {
  directorName: isString,
  onBackClick: isFunction,
};

export default DirectorView;
