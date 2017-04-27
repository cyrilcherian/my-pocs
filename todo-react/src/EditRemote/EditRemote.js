import React, {Component} from 'react';
import { Provider } from 'react-redux';
import './EditRemote.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SyncValidationForm2 from './EditRemoteForm';
import store from '../Store/EditRemote';

const handle = (values)=>{console.log(values, store.getState())};
class EditRemote extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <div style={{ padding: 15 }}>
            <SyncValidationForm2 onSubmit={handle}/>
          </div>
        </Provider>
      </div>
    );
  }
}

export default EditRemote;
