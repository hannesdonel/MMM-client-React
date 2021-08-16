import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './login-view.scss';

const LoginView = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { onLoggedIn, signupClick, toggleClass } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    /* then call this.props.onLoggedIn(username) */
    onLoggedIn(username);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="username">
        <Alert className={toggleClass ? 'just-registered visible' : 'just-registered'} variant="success">
          Please log in with your new username.
        </Alert>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <button
        className="new-user"
        type="button"
        onClick={() => {
          const newUser = 'New User';
          signupClick(newUser);
        }}
      >
        Create a new account
      </button>
    </Form>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  signupClick: PropTypes.func.isRequired,
  toggleClass: PropTypes.bool.isRequired,
};

export default LoginView;
