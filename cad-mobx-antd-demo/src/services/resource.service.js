import axios from 'axios'
import serverConfig from '../configs/service.config';
const baseUrl =  serverConfig.serverUrl+'resource-tasks/';

function getResourceList() {
    return axios.get(baseUrl);
}

function getResourceByIds(resIds) {
    return axios({
        method:'post',
        url:baseUrl+'ids',
        data:resIds,
        headers: {'Content-type': 'application/json;charset=UTF-8'},  
    });
}

const resourceService = {
    getResourceList: getResourceList,
    getResourceByIds: getResourceByIds,
}

export default resourceService;