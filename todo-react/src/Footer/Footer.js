import React, { Component } from 'react';
import './Footer.css';
class Footer extends Component {
  render() {
    return (<footer>{this.props.children}</footer>);
  }
}

export default Footer;