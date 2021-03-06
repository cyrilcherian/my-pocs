import React, { Component } from 'react';
import './Home.css';
import Nav from '../Nav/Nav';
import Article from '../Article/Article';
import Constant from '../Constant';

class Home extends Component {
  constructor() {
    super();
    this.nav = [Constant.SUPER_HIT, Constant.HIT, Constant.AVERAGE, Constant.FLOP];
  }
  render() {
    return (
      <div>
        <Nav reviews={this.nav}></Nav>
        <Article></Article>
      </div>
    );
  }
}

export default Home;
