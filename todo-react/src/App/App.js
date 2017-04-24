import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';
import Article from '../Article/Article';
import Constant from '../Constant';

class App extends Component {
  constructor() {
    super();
    this.nav = [Constant.SUPER_HIT, Constant.HIT, Constant.AVERAGE, Constant.FLOP];
    this.movies = [{ name: "Bahubali-The Beginneing", review: Constant.HIT },
    { name: "Bahubali-The Conclusion", review: Constant.SUPER_HIT },
    { name: "Magadheera", review: Constant.HIT },
    { name: "Titanic", review: Constant.HIT },
    { name: "Sixth Sense", review: Constant.FLOP },
    { name: "Arundhati", review: Constant.AVERAGE }];
  }
  render() {
    return (
      <div>
        <Header>Review World</Header>
        <Nav reviews={this.nav}></Nav>
        <Article movies={this.movies}></Article>
        <Footer>Powered by cyril</Footer>
      </div>
    );
  }
}

export default App;
