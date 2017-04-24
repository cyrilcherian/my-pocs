import React, { Component } from 'react';
import './Nav.css';
class Nav extends Component {
  render() {
    console.log(this.props.reviews)
    return (
    <nav>
      <ul>
        {this.props.reviews.map((review) => <li key={review}>{review}</li>)}
      </ul>
    </nav>);
  }
}

export default Nav;