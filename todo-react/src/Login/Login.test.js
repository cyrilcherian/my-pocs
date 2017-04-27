import React from 'react';
import ReactDOM from 'react-dom';
import Edit from './Edit';
import Header from '../Header/Header';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Edit />, div);
});
