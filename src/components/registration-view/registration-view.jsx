import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import {
  Form, Button, Spinner, Alert,
} from 'react-bootstrap';
import './registration-view.scss';

const RegistrationView = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const { onBackClick, toggleClass } = props;

  const validate = () => Form.current.reportValidity();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (validation) {
      showSpinner();
      try {
        const result = await axios.post('https://more-movie-metadata.herokuapp.com/users', {
          user_name: username,
          password,
          email,
          birth_date: birthdate,
        });
        console.log(result.data);
        toggleClass('new');
        onBackClick();
        hideSpinner();
      } catch (error) {
        const message = error.response.data;
        console.log(message);
        hideSpinner();
      }
    }
    validate();
  };

  return (
    <Form ref={Form}>
      <h4 className="text-warning text-center">Create Account</h4>

      <Form.Group className="mt-5 mb-3">
        <Alert variant="danger d-none">
          message
        </Alert>
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
        <Form.Label className="text-light">Birthday*</Form.Label>
        <Form.Control
          required
          id="birth_date"
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </Form.Group>
      <Button
        id="submit-button"
        className="my-3 button-gutter"
        variant="warning"
        type="submit"
        onClick={handleSubmit}
      >
        <Spinner
          id="spinner"
          className="d-none"
          as="span"
          animation="border"
          variant="dark"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden d-none">Loading...</span>
        <span id="submit">Register</span>
      </Button>
      <Button variant="warning" type="button" onClick={() => { onBackClick(); }}>Back</Button>
    </Form>
  );
};

RegistrationView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  toggleClass: PropTypes.func.isRequired,
};

export default RegistrationView;
