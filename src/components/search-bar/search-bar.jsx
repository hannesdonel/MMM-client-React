import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import * as actionCreators from '../../actions/actions';
import './search-bar.scss';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { setFilter } = actionCreators;
  const { filterString } = useSelector((state) => state);

  useEffect(() => {
    dispatch(setFilter(''));
  }, []);

  return (
    <div className="mt-3">
      <Form.Control
        className="mt-5 shadow-lg"
        type="search"
        value={filterString}
        placeholder="Search for movie, actor, genre or director"
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
      <button type="reset" className="btn-close d-none" aria-label="Reset search input" />
    </div>
  );
};

export default SearchBar;
