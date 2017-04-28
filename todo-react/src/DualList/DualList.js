import React, {Component} from 'react';
import { Provider } from 'react-redux';
import './DualList.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SyncValidationForm4 from './DualListForm';
import store from '../Store/DualList';

const handle = (values)=>{console.log(values, store.getState())};
class DualList extends Component {
  render() {
    console.log(this.props.location.pathname);
    return (
      <div>
        <Provider store={store}>
          <div style={{ padding: 15 }}>
            <SyncValidationForm4 onSubmit={handle}/>
          </div>
        </Provider>
      </div>
    );
  }
}

export default DualList;
