import { observable, action } from 'mobx';

class LogState {

    @observable isLogin;

    @observable userName;

    constructor() {
        this.isLogin = false;
        this.userName = '';
        //跳过登录页面
        // this.isLogin = true;
        // this.userName = 'admin';
    }

    @action.bound
    login(userName) {
        this.isLogin = true;
        this.userName = userName;
    }
}

const logstate = new LogState();

export default logstate;