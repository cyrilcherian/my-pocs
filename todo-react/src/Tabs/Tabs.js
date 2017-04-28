import React, { Component } from 'react';
import './Tabs.css';
import Constant from '../Constant';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
const Hello = () => (<div>Do Hello</div>);
const Bye = () => ( <div>Do Bye</div>);
const Tata = () => ( <div>Do Tata</div>);

class Tabs extends Component {
  
  doClick(value) {
    console.log(this.props.match)
    if (value === "hello"){
      this.props.history.push('/tabs/hello')
    }
    else if (value === "bye"){
      this.props.history.push('/tabs/bye');
    }
    else if (value === "tata"){
      this.props.history.push('/tabs/tata');
    }
  }
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li onClick={this.doClick.bind(this, "hello")}>Hello</li>
            <li onClick={this.doClick.bind(this, "bye")}>Bye</li>
            <li onClick={this.doClick.bind(this, "tata")}>Tata</li>
          </ul>
          <input type="text"/>
        </nav>
        <Route exact path={`/tabs/hello`} component={Hello}/>
        <Route path={`/tabs/bye`} component={Bye}/>
        <Route path={`/tabs/tata`} component={Tata}/>
      </div>
      );
  }
}

export default withRouter(Tabs);