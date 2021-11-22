import React, { useRef, useState } from 'react';
import axios from 'axios';
import {
  Form, Button, Spinner, Alert,
} from 'react-bootstrap';
import config from '../../config';
import { isFunction } from '../../types/index';
import './registration-view.scss';

import { showSpinner, hideSpinner } from '../../services/spinner-services';
import handlePasswordCheck from '../../services/password-check';

const RegistrationView = ({ onBackClick, toggleClass }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [message, setMessage] = useState('');

  const inputForm = useRef(null);

  const validate = () => inputForm.current.reportValidity();

  // Gets fired when submit button is hit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    const alertContainer = document.getElementById('alert-container');
    if (validation) {
      if (password !== passwordCheck) {
        setMessage('Your passwords aren\'t matching.');
        alertContainer.classList.remove('d-none');
      } else {
        showSpinner();
        try {
          await axios.post(`${config.API_URL}/users`, {
            user_name: username,
            password,
            email,
            birth_date: birthdate,
          });
          toggleClass('new');
          onBackClick();
          hideSpinner();
          alertContainer.classList.add('d-none');
        } catch (error) {
          setMessage(error.response.data);
          alertContainer.classList.remove('d-none');
          hideSpinner();
        }
      }
    }
    validate();
  };

  return (
    <Form ref={inputForm}>
      <h4 className="text-warning text-center">Create Account</h4>

      <Form.Group className="mt-5 mb-3">
        <Alert id="alert-container" className="d-none" variant="danger">
          {message}
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
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordCheck('');
          }}
          aria-describedby="passwordHelpBlock"
        />
        <Form.Text className="text-muted-custom" id="passwordHelpBlock">
          Your password must be 8-20 characters long.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-light">Repeat password</Form.Label>
        <Form.Control
          placeholder="Repeat password"
          id="passwordRepeat"
          type="password"
          value={passwordCheck}
          onChange={(e) => {
            setPasswordCheck(e.target.value);
            handlePasswordCheck(e.target.value, password);
          }}
          aria-describedby="passwordHelpBlock"
        />
        <Form.Text className="text-danger d-none" id="passwordCheckHelpBlock">
          The passwords do not match.
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
        id="button"
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
  onBackClick: isFunction,
  toggleClass: isFunction,
};

export default RegistrationView;
