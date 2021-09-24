import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import MainView from './components/main-view/main-view';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const store = createStore(moviesApp, applyMiddleware(thunk));

class MoreMovieMetadata extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const myTimeOut = (action, time) => {
      setTimeout(() => action, time);
    };

    const scrolled = window.scrollY;
    const toTopButton = document.getElementById('toTop');
    if (scrolled > 200) {
      toTopButton.classList.add('fadeIn');
      toTopButton.classList.remove('fadeOut');
      myTimeOut(toTopButton.style.display = 'block', 250);
    } else if (scrolled < 200) {
      myTimeOut(toTopButton.style.display = 'none', 3000);
      toTopButton.classList.remove('fadeIn');
      toTopButton.classList.add('fadeOut');
    }
  }

toTopFunction = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

render() {
  return (
    <Provider store={store}>
      <Container className="container">
        <MainView />
        <button onClick={() => this.toTopFunction()} id="toTop" title="Go to top">&#8593;</button>
      </Container>
    </Provider>
  );
}
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MoreMovieMetadata), container);
