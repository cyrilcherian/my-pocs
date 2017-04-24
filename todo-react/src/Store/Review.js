import { createStore } from 'redux';
import Constant from '../Constant';
// reducer 
function counter(state = [], action) {
    switch (action.type) {
        case Constant.REVIEW_CONSTANT.GIVE_REVIEW:
            return state;
        case Constant.REVIEW_CONSTANT.ADD_MOVIE:
            return state;
        default:
            return state;
    }
}
const movies = [{ name: "Bahubali-The Beginneing", review: Constant.HIT },
{ name: "Bahubali-The Conclusion", review: Constant.SUPER_HIT },
{ name: "Magadheera", review: Constant.HIT },
{ name: "Titanic", review: Constant.HIT },
{ name: "Sixth Sense", review: Constant.FLOP },
{ name: "Arundhati", review: Constant.AVERAGE }];
const store = createStore(counter, movies);
export default store;