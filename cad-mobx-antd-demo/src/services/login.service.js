import axios from 'axios'
import serverConfig from '../configs/service.config';
const baseUrl = serverConfig.serverUrl+'login/';

function login(username,pwd){
    return axios({
        method:'get',
        url:baseUrl,
        params:{
            userName:username,
            password:pwd
        }
    })
}

const loginService = {
    login:login
}

export default loginService;