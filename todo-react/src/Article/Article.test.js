import React from 'react';
import ReactDOM from 'react-dom';
import Article from './Article';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const movies = [{ name: "Bahubali-The Beginneing", review: "Hit" }, 
  { name: "Bahubali-The Conclusion", review: "Flop" }];
  ReactDOM.render(<Article movies={movies}></Article>, div);
});
