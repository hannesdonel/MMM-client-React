import React from 'react';
import { Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import './favorites-view.scss';

const FavoritesView = () => {
  const { userData } = useSelector((state) => state);

  const { favorites } = userData;
  const dispatch = useDispatch;

  return (
    <>
      <Row>
        <h4 className="text-warning text-center mt-5 pt-3">
          Your favorites
        </h4>
      </Row>
      <Row className="mt-3">
        <MoviesList
          favorites={favorites}
        />
      </Row>
    </>
  );
};

export default FavoritesView;
