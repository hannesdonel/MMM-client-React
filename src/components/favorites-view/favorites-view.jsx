import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MoviesList from '../movies-list/movies-list';
import './favorites-view.scss';

const FavoritesView = () => {
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
          />
        </Row>
      </Container>
    </>
  );
};

export default FavoritesView;
