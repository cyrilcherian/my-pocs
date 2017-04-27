import { createStore } from 'redux';
import user from '../Reducers/user';
const store = createStore(user.login, {});
export default store;