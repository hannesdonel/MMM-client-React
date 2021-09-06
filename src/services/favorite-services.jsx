import axios from 'axios';
import fetchServices from './fetch-services';
import config from '../config';

const favoriteServices = (favoriteServicesData) => {
  const { getUser } = fetchServices();
  const {
    movieData,
    spinnerId,
    heartId,
    userFavorites,
    userId,
    setButtonState,
  } = favoriteServicesData;

  const services = {
    showSpinner: () => {
      const favoriteButton = document.getElementById(movieData._id);
      const spinner = document.getElementById(spinnerId);
      const heart = document.getElementById(heartId);
      spinner.classList.remove('d-none');
      heart.classList.add('d-none');
      favoriteButton.setAttribute('disabled', '');
    },

    hideSpinner: () => {
      const favoriteButton = document.getElementById(movieData._id);
      const spinner = document.getElementById(spinnerId);
      const heart = document.getElementById(heartId);
      spinner.classList.add('d-none');
      heart.classList.remove('d-none');
      favoriteButton.removeAttribute('disabled', '');
    },

    checkFavorites: (movieToCheck) => (
      userFavorites.some((favorite) => {
        if (favorite._id !== movieToCheck) {
          return false;
        }
        return true;
      })),

    handleFavorite: async (favoriteMovie) => {
      services.showSpinner();
      const accessToken = localStorage.getItem('token');

      if (services.checkFavorites(favoriteMovie)) {
        try {
          await axios.delete(`${config.API_URL}/users/${userId}/favorites/${favoriteMovie}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          getUser(accessToken);
          services.hideSpinner();
          setButtonState('outline-warning');
        } catch (error) {
          console.log(error);
          services.hideSpinner();
        }
      } else {
        try {
          await axios.put(`${config.API_URL}/users/${userId}/favorites/${favoriteMovie}`, {}, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          getUser(accessToken);
          services.hideSpinner();
          setButtonState('warning');
        } catch (error) {
          console.log(error);
          services.hideSpinner();
        }
      }
    },

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
