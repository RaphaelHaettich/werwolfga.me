import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import App from './components';
import './index.css';

injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
