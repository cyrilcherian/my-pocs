import React, {Component} from 'react';
import { Provider } from 'react-redux';
import './Add.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SyncValidationForm1 from './AddForm';
import store from '../Store/Edit';

const handle = (values)=>{console.log(values)};
class Add extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <div style={{ padding: 15 }}>
            <SyncValidationForm1 onSubmit={handle}/>
          </div>
        </Provider>
      </div>
    );
  }
}

export default Add;
