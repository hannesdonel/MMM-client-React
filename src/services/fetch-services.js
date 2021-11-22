import axios from 'axios';
import { useDispatch } from 'react-redux';
import config from '../config';
import {
  setUser, setUserData, setDirectors, setGenres, setMovies,
} from '../actions/actions';

const fetchServices = () => {
  const dispatch = useDispatch();

  const services = {
    getUser: async (token) => {
      try {
        const response = await axios.get(`${config.API_URL}/users/${localStorage.user}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUserData(response.data.user));
        dispatch(setUser(response.data.user.user_name));
        localStorage.setItem('userName', response.data.user.user_name);
      } catch (error) {
        console.log(error);
      }
    },

    getMovies: async (token) => {
      try {
        const response = await axios.get(`${config.API_URL}/movies`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        response.data.sort((a, b) => a.title > b.title);
        dispatch(setMovies(response.data));
      } catch (error) {
        console.log(error);
      }
    },

    getDirectors: async (token) => {
      try {
        const response = await axios.get(`${config.API_URL}/directors`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        response.data.sort((a, b) => a.name > b.name);
        dispatch(setDirectors(response.data));
      } catch (error) {
        console.log(error);
      }
    },

    getGenres: async (token) => {
      try {
        const response = await axios.get(`${config.API_URL}/genres`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        response.data.sort((a, b) => a.name > b.name);
        dispatch(setGenres(response.data));
      } catch (error) {
        console.log(error);
      }
    },
  };

  return services;
};

export default fetchServices;
