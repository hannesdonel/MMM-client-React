import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import * as actionCreators from '../../actions/actions';
import './search-bar.scss';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { setFilter } = actionCreators;
  const filteredMovies = useSelector((state) => state.filteredMovies);

  return (
    <Form.Control
      className="mt-5 shadow-lg"
      type="text"
      placeholder="Search for movie, genre or director"
      value={filteredMovies}
      onChange={(e) => dispatch(setFilter(e.target.value))}
    />
  );
};

export default SearchBar;
