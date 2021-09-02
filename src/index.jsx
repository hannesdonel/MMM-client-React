import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import MainView from './components/main-view/main-view';

import './index.scss';

const store = createStore(moviesApp, applyMiddleware(thunk));

class MoreMovieMetadata extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container className="container">
          <MainView />
        </Container>
      </Provider>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MoreMovieMetadata), container);
