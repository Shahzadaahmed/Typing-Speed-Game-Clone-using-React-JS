import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Importing Bootstrap 4...!
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import TypingSpeedGame from './TypingSpeedGame';

ReactDOM.render(
  <React.StrictMode>
    <TypingSpeedGame />
  </React.StrictMode>,
  document.getElementById('root')
);