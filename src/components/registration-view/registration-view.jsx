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

  const validate = () => Form.current.reportValidity();
  /* eslint-disable-next-line */

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (validation) {
      console.log(username, password, email, birthdate);
      toggleClass('new');
      onBackClick(null);
    }
    validate();
    /* Send a request to the server for authentication */
    /* then call this.props.onLoggedIn(username) */
  };

  return (
    <Form ref={Form}>
      <h4 className="text-warning text-center">Create Account</h4>

      <Form.Group className="mt-5 mb-3">
        <Form.Label className="text-light">Username*</Form.Label>
        <Form.Control
          required
          placeholder="Chose a username"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-light">Password*</Form.Label>
        <Form.Control
          required
          placeholder="Set a password"
          id="password"
          type="password"
          minLength={8}
          maxLength={20}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby="passwordHelpBlock"
        />
        <Form.Text className="text-muted-custom" id="passwordHelpBlock">
          Your password must be 8-20 characters long.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-light">E-Mail*</Form.Label>
        <Form.Control
          required
          placeholder="Provide your E-mail adress"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-light">Birthday</Form.Label>
        <Form.Control
          id="birth_date"
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </Form.Group>
      <Button variant="warning" className="button-gutter" type="submit" onClick={handleSubmit}>Submit</Button>
      <Button variant="warning" type="button" onClick={() => { onBackClick('false'); }}>Back</Button>
    </Form>
  );
};

RegistrationView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  toggleClass: PropTypes.func.isRequired,
};

export default RegistrationView;
