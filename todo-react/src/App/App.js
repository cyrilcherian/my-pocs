import React, { Component } from 'react';
import { BrowserRouter as Router, Route, IndexRoute, DefaultRoute, Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { createStore, combineReducers } from 'redux';
import './App.css';
import Home from '../Home/Home';
import Edit from '../Edit/Edit';
import Add from '../Add/Add';
import EditRemote from '../EditRemote/EditRemote';
import Product from '../Product/Product';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import DualList from '../DualList/DualList';
import Tabs from '../Tabs/Tabs';

const SuperHit = () => ( <Product><div>Hi Superhit</div></Product>);
const Hit = () => ( <Product><div>Hi hit</div></Product>);
const Average = () => ( <Product><div>Hi Average</div></Product>);
const Flop = () => ( <Product><div>Hi Flop</div></Product>);
const change = () => {console.log("Called!!!!!!!!!!"); return false;};
class App extends Component {
  componentWillMount(){
    console.log("will moun");
  }
  changed() {
    console.log("path changed");
  }
  render() {
    return (
      <div>
        <Header>Review World</Header>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/help" render={()=>(change()? <Redirect to="/add"/>: <Redirect to="/edit"/>)}/>
            <Route path="/edit" component={Edit}/>
            <Route path="/add" component={Add} />
            <Route path="/editremote" component={EditRemote} />
            <Route path="/product/super-hit" component={SuperHit} />
            <Route  path="/product/hit" component={Hit} />
            <Route  path="/product/flop" component={Flop} />
            <Route  path="/product/average" component={Add} />
            <Route  path="/login" component={Login} />
            <Route  path="/dual/:test" component={DualList} />
            <Route  path="/tabs" component={Tabs} />
          </div>
        </Router>
        <Footer>Powered by cyril</Footer>
      </div>
    );
  }
}

export default App;
