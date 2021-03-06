import React, {Component} from 'react';
import { Provider } from 'react-redux';
import './Edit.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SyncValidationForm from './EditForm';
import store from '../Store/Edit';

const handle = (values)=>{console.log(values, store.getState())};
class Edit extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <div style={{ padding: 15 }}>
            <SyncValidationForm onSubmit={handle}/>
          </div>
        </Provider>
      </div>
    );
  }
}

export default Edit;
