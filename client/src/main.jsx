import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './css/var.css';
import './css/util.css';
import './css/elevation.css';
import './css/layout.css';
import './css/skeleton.css';

import './css/themes/light.css';
import './css/themes/dark.css';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);