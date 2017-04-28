import userStore from '../Store/User';
import dualStore from '../Store/DualStore';

class User {
    logMeIn(values) {
        var p = new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve({ "uname": "cyril" });
            }, 3500);
        });
        p.then((data) => {
            var action = {
                type: 'LOG_IN',
                info: data
            };
            userStore.dispatch(action);
        });
        return p;
    }
    dualData() {
        var p = new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve([{ id: "12", name: "Hi-12" },
                { id: "01", name: "Hi-01" },
                { id: "02", name: "Hi-02" },
                { id: "11", name: "Hi-11" },
                { id: "21", name: "Hi-21" },
                { id: "22", name: "Hi-22" }]);
            }, 500);
        });
        p.then((data) => {
            var action = {
                type: 'INIT',
                info: data
            };
            dualStore.dispatch(action);
        });
        return p;
    }

}
let user = new User();
export default user; 