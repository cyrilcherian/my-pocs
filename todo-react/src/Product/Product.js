import React, { Component } from 'react';
import './Product.css';
import Nav from '../Nav/Nav';
import Constant from '../Constant';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Add from '../Add/Add';


class Product extends Component {

  constructor() {
    super();
    this.nav = [Constant.SUPER_HIT, Constant.HIT, Constant.AVERAGE, Constant.FLOP];
  }
  render(route) {
    console.log("sa". route)
    return (
      <div>
        <Nav reviews={this.nav}></Nav>
        <article>
           {this.props.children}
        </article>
      </div>
    );
  }
}

export default Product;
