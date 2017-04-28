import { createStore } from 'redux';
import dualList from '../Reducers/DualList';
const store = createStore(dualList.do, []);
export default store;