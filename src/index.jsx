import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import MainView from './components/main-view/main-view';

import './index.scss';

class MoreMovieMetadata extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MoreMovieMetadata), container);
