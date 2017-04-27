import React, { Component } from 'react';
import './Nav.css';
import Constant from '../Constant';
import { withRouter } from 'react-router';
class Nav extends Component {
  doClick(value) {
    if (value === Constant.SUPER_HIT){
      this.props.history.push('/product/super-hit')
    }
    else if (value === Constant.HIT){
      this.props.history.push('/product/hit');
    }
    else if (value === Constant.AVERAGE){
      this.props.history.push('/product/average');
    }
    else if (value === Constant.FLOP){
      this.props.history.push('/product/flop');
    }
  }
  render() {
    return (
      <nav>
        <ul>
          { this.props.reviews.map((review) => 
            <li onClick={this.doClick.bind(this, review)} key={review}>{review}</li>, this) }
        </ul>
      </nav>);
  }
}

export default withRouter(Nav);