import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const nav = ["Super Hit", "Hit", "Average", "Flop"];
  ReactDOM.render(<Nav reviews={nav}></Nav>, div);
});
