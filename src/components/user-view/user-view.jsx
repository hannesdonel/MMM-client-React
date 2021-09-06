import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Form, Button, Spinner, Alert, Modal,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../config';
import fetchServices from '../../services/fetch-services';
import * as actionCreators from '../../actions/actions';
import { isFunction } from '../../types/index';
import './user-view.scss';

const UserView = ({ onBackClick }) => {
  const dispatch = useDispatch();
  const { setUser } = actionCreators;

  const userData = useSelector((state) => state.userData);

  const [username, setUsername] = useState(userData.user_name);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [email, setEmail] = useState(userData.email);
  const [birthdate, setBirthdate] = useState(userData.birth_date);
  const [message, setMessage] = useState('');
  const [showModal, setModalShow] = useState(false);

  const { getUser } = fetchServices();
  const truncate = (str) => (str.length > 10 ? str.substring(0, 10) : str);

  const inputForm = useRef(null);

  const validate = () => inputForm.current.reportValidity();

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

  const showDeleteSpinner = () => {
    const spinner = document.getElementById('delete-spinner');
    const submit = document.getElementById('delete-submit');
    const button = document.getElementById('delete-button');
    spinner.classList.remove('d-none');
    submit.classList.add('d-none');
    button.setAttribute('disabled', '');
  };

  const hideDeleteSpinner = () => {
    const spinner = document.getElementById('delete-spinner');
    const submit = document.getElementById('delete-submit');
    const button = document.getElementById('delete-button');
    spinner.classList.add('d-none');
    submit.classList.remove('d-none');
    button.removeAttribute('disabled', '');
  };

  const handlePasswordCheck = (string) => {
    const alert = document.getElementById('passwordCheckHelpBlock');
    if (password === string || string === '') {
      alert.classList.add('d-none');
    } else {
      alert.classList.remove('d-none');
    }
  };

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
        const successContainer = document.getElementById('success-container');
        const token = localStorage.getItem('token');
        try {
          await axios.put(`${config.API_URL}/users/${userData._id}`, {
            user_name: username,
            password,
            email,
            birth_date: birthdate,
          }, { headers: { Authorization: `Bearer ${token}` } });
          getUser(token);
          hideSpinner();
          successContainer.classList.remove('d-none');
          alertContainer.classList.add('d-none');
        } catch (error) {
          setMessage(error.response.data);
          successContainer.classList.add('d-none');
          alertContainer.classList.remove('d-none');
          hideSpinner();
        }
      }
    }
    validate();
  };

  const handleConfirmation = (value) => {
    const deleteButton = document.getElementById('delete-button');
    if (value === 'DELETE') {
      deleteButton.classList.remove('d-none');
    } else {
      deleteButton.classList.add('d-none');
    }
  };

  const history = useHistory();

  const handleDeletion = async () => {
    showDeleteSpinner();
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${config.API_URL}/users/${userData._id}`,
        { headers: { Authorization: `Bearer ${token}` } });
      localStorage.clear();
      hideDeleteSpinner();
      dispatch(setUser(null));
      history.push('/');
    } catch (error) {
      console.log(error);
      hideDeleteSpinner();
    }
  };

  const handleDeleteClick = () => {
    const validation = validate();
    if (validation) {
      setModalShow(true);
    }
    validate();
  };

  return (
    <>
      <Form ref={inputForm}>
        <h4 className="text-warning text-center">Your Account</h4>

        <Form.Group className="mt-5 mb-3">
          <Alert id="alert-container" className="d-none" variant="danger">
            {message}
          </Alert>
          <Alert id="success-container" className="d-none" variant="success">
            Your user data has been successfully changed.
          </Alert>
          <Form.Label className="text-light">Username*</Form.Label>
          <Form.Control
            required
            placeholder={username}
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
            placeholder="Set new password or provide existing password."
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
              handlePasswordCheck(e.target.value);
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
            placeholder={email}
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
            placeholder={birthdate}
            id="birth_date"
            type="date"
            value={truncate(birthdate)}
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
          <span id="submit">Change Data</span>
        </Button>
        <Button
          className="my-3 button-gutter"
          variant="danger"
          type="button"
          onClick={() => { handleDeleteClick(); }}
        >
          <span id="submit">Delete Account</span>
        </Button>
        <Button variant="warning" type="button" onClick={() => { onBackClick(); }}>Back</Button>
      </Form>
      <Modal
        show={showModal}
        onHide={() => { setModalShow(false); }}
        className=""
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="text-center">
          <h4>DELETE ACCOUNT</h4>
          <p>
            Please type DELETE if you really want to delete your account.
            This action can not be made undone.
          </p>
          <input type="text" onChange={(e) => { handleConfirmation(e.target.value); }} />
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            id="delete-button"
            className="d-none"
            variant="danger"
            onClick={() => { handleDeletion(); }}
          >
            <Spinner
              id="delete-spinner"
              className="d-none"
              as="span"
              animation="border"
              variant="dark"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden d-none">Loading...</span>
            <span id="delete-submit">Delete</span>
          </Button>
          <Button
            variant="success"
            type="button"
            onClick={() => { setModalShow(false); }}
          >
            Keep Account

          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

UserView.propTypes = {
  onBackClick: isFunction,
};

export default UserView;
