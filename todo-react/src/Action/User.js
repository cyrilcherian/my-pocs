import userStore from '../Store/User';

class User {
    logMeIn(values) {
        var p = new Promise((resolve, reject) => {
            setTimeout(function () {
                  resolve({"uname":"cyril"});  
            }, 3500);
        });
        p.then((data)=>{
            var action = {
                type: 'LOG_IN',
                info: data
            };
            userStore.dispatch(action);
        });
        return p;
    }
}
let user = new User();
export default user; 