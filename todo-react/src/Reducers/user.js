class User {
    login(state, action) {
        if (typeof state === 'undefined') {
            state = {}; // If state is undefined, initialize it with a default value
        }

        if (action.type === 'LOG_IN') {
            return action.info;
        }
        else if (action.type === 'LOG_OUT') {
            return {};
        }
        else {
            return state; // In case an action is passed in we don't understand
        }
    }
}
let user = new User();
export default user;