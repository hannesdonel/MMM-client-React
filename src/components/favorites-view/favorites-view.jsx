import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { isFunction } from '../../types';
import MoviesList from '../movies-list/movies-list';
import './favorites-view.scss';

const FavoritesView = ({ getUser }) => {
  const { userData } = useSelector((state) => state);

  const { favorites } = userData;

  return (
    <>
      <Row>
        <h4 className="text-warning text-center mt-5 pt-3">
          Your favorites
        </h4>
      </Row>
      <Container className="px-0 mt-3">
        <Row>
          <MoviesList
            favorites={favorites}
            getUser={getUser}
          />
        </Row>
      </Container>
    </>
  );
};

FavoritesView.propTypes = {
  getUser: isFunction,
};

export default FavoritesView;