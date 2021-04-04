import React from 'react';
import { render } from 'react-dom';
import App from './pages';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { unregister } from './serviceWorker';

import './index.css';

axios.defaults.baseURL = 'https://core-api-dev.mystoreaid.net/v1/';
axios.defaults.headers.common['X-El-Parah-Hash'] =
  'sjfvbkjwn382929dnjbd9292nsgskfn2343';
axios.defaults.headers.common['X-El-Parah-Client'] = 'elp-test-app';

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
