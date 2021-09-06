import axios from 'axios';
import React, { useRef, useState } from 'react';
import {
  Col, Form, Button, Alert, Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilter, setUser } from '../../actions/actions';
import fetchServices from '../../services/fetch-services';
import config from '../../config';
import { isString, isFunction } from '../../types/index';
import './login-view.scss';

const LoginView = ({
  toggleClass, alert,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const {
    getUser, getMovies, getDirectors, getGenres,
  } = fetchServices();

  const inputForm = useRef(null);

  const validate = () => inputForm.current.reportValidity();

  const onLoggedIn = (authData) => {
    localStorage.setItem('user', authData.user._id);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('userName', authData.user.user_name);
    dispatch(setUser(authData.user.user_name));
    const fetchApi = async () => {
      await getUser(authData.token);
      getMovies(authData.token);
      getDirectors(authData.token);
      getGenres(authData.token);
    };
    dispatch(setFilter(''));
    fetchApi();
  };

  const showSpinner = () => {
    const spinner = document.getElementById('spinner');
    const submit = document.getElementById('submit');
    const button = document.getElementById('submit-button');
    spinner.classList.remove('d-none');
    submit.classList.add('d-none');
    button.setAttribute('disabled', '');
  };

  const hideSpinner = () => {
    const spinner = document.getElementById('spinner');
    const submit = document.getElementById('submit');
    const button = document.getElementById('submit-button');
    spinner.classList.add('d-none');
    submit.classList.remove('d-none');
    button.removeAttribute('disabled', '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (validation) {
      const login = async () => {
        showSpinner();
        try {
          const response = await axios.post(`${config.API_URL}/login`, {
            user_name: username,
            password,
          });
          toggleClass('false');
          hideSpinner();
          onLoggedIn(response.data);
        } catch (error) {
          setMessage(error.response.data.message);
          toggleClass('noSuchUser');
          hideSpinner();
        }
      };
      login();
    }
    validate();
  };

  return (
    <Form ref={inputForm}>
      <h1 className="text-warning text-center">MORE MOVIE METADATA</h1>
      <h4 className="mt-3 text-warning text-center">Login</h4>

      <Form.Group className="mt-5 mb-3" controlId="username">
        <Alert className={alert === 'new' ? 'just-registered visible' : 'just-registered'} variant="success">
          Please log in with your new username.
        </Alert>
        <Alert className={alert === 'noSuchUser' ? 'just-registered visible' : 'just-registered'} variant="danger">
          {message}
          {' '}
          Please enter valid login or
          <Link to="/registration">
            <button
              className="new-user text-primary"
              type="button"
            >
              sign up.
            </button>
          </Link>
        </Alert>
        <Form.Label className="text-light">Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label className="text-light">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Col className="text-center">
        <Button
          id="submit-button"
          className="my-3"
          variant="warning"
          type="submit"
          onClick={handleSubmit}
        >
          <Spinner
            id="spinner"
            className="d-none"
            as="span"
            animation="border"
            size="sm"
            variant="dark"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden d-none">Loading...</span>
          <span id="submit">Submit</span>
        </Button>
      </Col>
      <Col className="text-center">
        <Link to="/registration">
          <Button
            className="text-warning"
            variant="link"
          >
            Create a new account
          </Button>
        </Link>
      </Col>

    </Form>
  );
};

LoginView.propTypes = {
  toggleClass: isFunction,
  alert: isString,
};

export default LoginView;
