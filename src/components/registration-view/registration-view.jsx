import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './registration-view.scss';

const RegistrationView = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const { onBackClick, toggleClass } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    /* then call this.props.onLoggedIn(username) */
    console.log(username, password, email, birthdate);
    toggleClass(true);
    onBackClick(null);
  };

  return (
    <form>
      <label htmlFor="username">
        <span>Username*</span>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label htmlFor="password">
        <span>Password*</span>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label htmlFor="email">
        <span>E-Mail*</span>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="birth_date">
        <span>Birthday</span>
        <input
          id="birth_date"
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <button type="button" onClick={() => { onBackClick(null); }}>Back</button>
    </form>
  );
};

RegistrationView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  toggleClass: PropTypes.func.isRequired,
};

export default RegistrationView;
