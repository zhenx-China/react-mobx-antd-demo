import axios from 'axios'
import serverConfig from '../configs/service.config';
const baseUrl = serverConfig.serverUrl+'incidents/';

function getIncidentList() {
    return axios.get(baseUrl);
}

function getUnDisposalNum() {
    return axios.get(baseUrl + "unDisposalNum");
}

function addIncident(inc) {
    return axios({
        method: 'post',
        url: baseUrl,
        data: inc,
    });
}

function disposalIncident(id) {
    return axios({
        method: 'put',
        url: baseUrl+id,
        params: {
            isDisposal:true
        }
    });

}

const incidentService = {
    getIncidentList: getIncidentList,
    getUnDisposalNum: getUnDisposalNum,
    addIncident: addIncident,
    disposalIncident: disposalIncident,
}

export default incidentService;