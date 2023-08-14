import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MemoryGame from './MemoryGame';

ReactDOM.render(
  <React.StrictMode>
    <h1>Memory Game </h1><br/>
    <MemoryGame />
  </React.StrictMode>,
  document.getElementById('root')
);