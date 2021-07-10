import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './asserts/scss/all.scss';
import { ModelProvider } from './Hoc/Model';
import initializeFirebase from './js/firebase-init';
import App from './Router';

initializeFirebase();


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ModelProvider>
        <App />
      </ModelProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);