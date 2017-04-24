import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Header from '../Header/Header';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
});
