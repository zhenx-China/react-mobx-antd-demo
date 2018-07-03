import axios from 'axios'
import serverConfig from '../configs/service.config';
const baseUrl = serverConfig.serverUrl+'resource-task-records/';

function getAll() {
    return axios({
        method: 'get',
        url: baseUrl
    })
}

function add(val) {
    return axios({
        method: 'post',
        url: baseUrl,
        data: val,
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
    });
}

function getDispatchedRes(incId) {
    return axios({
        method: 'get',
        url: baseUrl+incId
    })
}

function getResourceTaskRecordByIncId(incId){
    return axios({
        method: 'get',
        url: baseUrl+'logs/'+incId
    })
}

const resTaskRecordService = {
    getAll: getAll,
    add: add,
    getDispatchedRes:getDispatchedRes,
    getResourceTaskRecordByIncId:getResourceTaskRecordByIncId,
}

export default resTaskRecordService;