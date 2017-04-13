import React, { Component } from 'react';
import Heart from './Heart';
import TodoList from './TodoList';
class App extends Component {
  constructor(){
    super();
    this.state = {txt:"Cyril", val:9, event:"000", hello:{b:"---"}, data:{fn:"Cyril", ln:"Cherian"}};
  }
  update(e){
    this.setState({txt: e.target.value});
    this.setState({hello: e.target.value});
  }
  doEvent(e){
    this.setState({hello: {b:e.type}});
  }

  modelUpdate(){
    console.log(this.refs.ln.value);
    console.log(this.fn.refs.afn.value);
  }
  render() {
    return (
      <div>
        <h1>HI</h1>
        <div>{this.state.txt} - {this.state.val}</div>
        <h1>{this.props.txt}</h1>
        <h1>{this.props.num}</h1>
        <input type="text" onChange={this.update.bind(this)} />
        <textarea type="text" onCopy={this.doEvent.bind(this)} />
        <h1>{this.state.hello.b}</h1>
        <Button>Bye<Heart /></Button>
        <hr/>
        <label>First Name</label>
        <Input ref={component => this.fn = component} update={this.modelUpdate.bind(this)} type="text"/>
        <label>Last Name</label>
        <input ref="ln" onChange={this.modelUpdate.bind(this)} type="text"/>
        <hr/>
        <TodoList/>
      </div>
    );
  }
}
class Button extends Component {
  constructor(props){
    super();
    this.props = props;
  }
  render() {
    return (
      <button>{this.props.children}</button>
    );
  }
}
class Input extends Component {
  constructor(props){
    super();
    this.props = props;
  }
  render() {
    return (
      <input ref="afn" onChange={this.props.update} type="text"/>
    );
  }
}

App.propTypes = {
  txt: React.PropTypes.string,
  num: React.PropTypes.number.isRequired
}
export default App;
