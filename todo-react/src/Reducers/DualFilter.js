class DualFilter {
    do(state, action) {
        console.log("helooooooooooooooooooo in dual flter")
        if (typeof state === 'undefined') {
            state = []; // If state is undefined, initialize it with a default value
        }

        if (action.type === 'FILTER') {
            return [...action.info];
        }
        else {
            return state; // In case an action is passed in we don't understand
        }
    }
}
let dualFilter = new DualFilter();
export default dualFilter;