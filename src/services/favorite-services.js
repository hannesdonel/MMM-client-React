import axios from 'axios';
import fetchServices from './fetch-services';
import config from '../config';
import { showSpinner, hideSpinner } from './spinner-services';

const favoriteServices = (favoriteServicesData) => {
  const { getUser } = fetchServices();
  const {
    movieData,
    userFavorites,
    userId,
    setButtonState,
  } = favoriteServicesData;

  const services = {
    // Checks if a specifi user is a user's favorite
    checkFavorites: (movieToCheck) => (
      userFavorites.some((favorite) => {
        if (favorite._id !== movieToCheck) {
          return false;
        }
        return true;
      })),

    // Gets fired when favorite button is hit
    handleFavorite: async (favoriteMovie) => {
      showSpinner(movieData._id);
      const accessToken = localStorage.getItem('token');

      if (services.checkFavorites(favoriteMovie)) {
        try {
          await axios.delete(`${config.API_URL}/users/${userId}/favorites/${favoriteMovie}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          getUser(accessToken);
          hideSpinner(movieData._id);
          setButtonState('outline-warning');
        } catch (error) {
          console.log(error);
          hideSpinner(movieData._id);
        }
      } else {
        try {
          await axios.put(`${config.API_URL}/users/${userId}/favorites/${favoriteMovie}`, {}, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          getUser(accessToken);
          hideSpinner(movieData._id);
          setButtonState('warning');
        } catch (error) {
          console.log(error);
          hideSpinner(movieData._id);
        }
      }
    },

    // If a movie is in the user's favorite list this function colors the favorite button
    // accordingly
    markFavorite: () => {
      if (services.checkFavorites(movieData._id)) {
        setButtonState('warning');
      } else {
        setButtonState('outline-warning');
      }
    },
  };

  return services;
};

export default favoriteServices;
