import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
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
    <Form>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username*</Form.Label>
        <Form.Control
          required
          placeholder="Chose a username"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password*</Form.Label>
        <Form.Control
          required
          placeholder="Set a password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>E-Mail*</Form.Label>
        <Form.Control
          required
          placeholder="Provide your E-mail adress"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="birth_date">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          id="birth_date"
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </Form.Group>
      <Button className="submit-button" type="submit" onClick={handleSubmit}>Submit</Button>
      <Button type="button" onClick={() => { onBackClick(null); }}>Back</Button>
    </Form>
  );
};

RegistrationView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  toggleClass: PropTypes.func.isRequired,
};

export default RegistrationView;
