class DualList {
    do(state, action) {
        if (typeof state === 'undefined') {
            state = []; // If state is undefined, initialize it with a default value
        }

        if (action.type === 'INIT') {
            return [...action.info];
        }
        else if (action.type === 'CLEAR') {
            return [];
        }
        else {
            return state; // In case an action is passed in we don't understand
        }
    }
}
let dualList = new DualList();
export default dualList;