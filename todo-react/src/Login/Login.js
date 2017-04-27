import React, {Component} from 'react';
import { Provider } from 'react-redux';
import './Login.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SyncValidationForm3 from './LoginForm';
import store from '../Store/Login';
import userStore from '../Store/User';
import userAction from '../Action/User';

const handle = (values, me)=>{
  console.log(values, userStore.getState())

  const unsub = userStore.subscribe(()=>{
    console.log(userStore.getState(), "yeaaaaaaaaaaaa");
    unsub();
    me.props.history.push("/edit");
  });
  userAction.logMeIn();
};
class Login extends Component {
  render() {
    var me = this;
    return (
      <div>
        <Provider store={store}>
          <div style={{ padding: 15 }}>
            <SyncValidationForm3 onSubmit={(value)=>handle(value, me)}/>
          </div>
        </Provider>
      </div>
    );
  }
}

export default Login;
