import PropTypes from 'prop-types';
import React, { useState } from 'react';
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
    <div>
      <span className={toggleClass ? 'just-registered visible' : 'just-registered'}>Please log in with your new username.</span>
      <form>
        <label htmlFor="username">
          <span>Username</span>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <span>Password</span>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
      <button
        type="button"
        onClick={() => {
          const newUser = 'New User';
          signupClick(newUser);
        }}
      >
        Create a new account
      </button>
    </div>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  signupClick: PropTypes.func.isRequired,
  toggleClass: PropTypes.bool.isRequired,
};

export default LoginView;
