import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import Edit from '../Edit/Edit';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/edit" component={Edit} />
        </div>
      </Router>
    );
  }
}

export default App;
