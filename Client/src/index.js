import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import AppRoot from './components/AppRoot'

ReactDOM.render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
