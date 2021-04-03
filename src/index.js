import 'typeface-roboto';

import React from 'react';
import { render } from 'react-dom';
import App from './pages';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { unregister } from './serviceWorker';

import './index.css';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

const rootElement = document.querySelector('#root');

window.onload = () => {
  if (rootElement) {
    render(
      <Router>
        <App />
      </Router>,
      rootElement
    );
  }
};

unregister();
