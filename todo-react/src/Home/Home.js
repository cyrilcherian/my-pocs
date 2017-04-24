import React, { Component } from 'react';
import './Home.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
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
        <Header>Review World</Header>
        <Nav reviews={this.nav}></Nav>
        <Article></Article>
        <Footer>Powered by cyril</Footer>
      </div>
    );
  }
}

export default Home;
