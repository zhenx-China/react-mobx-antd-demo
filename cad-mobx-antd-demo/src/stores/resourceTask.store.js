import { observable, action } from 'mobx';
import resTaskRecordService from '../services/resTaskRecord.service';

class ResourceTask {

    @observable resList = [];

    dispatchedRes = observable.map();

    resTaskReord = observable.map();

    @action.bound
    initResList(val) {
        this.resList = val;
    }

    @action.bound
    setDispatchedRes(key, val) {
        this.dispatchedRes.set(key, val);
    }

    @action.bound
    setResTaskReord(key, val) {
        this.resTaskReord.set(key, val);
    }

    @action.bound
    freshResTaskRecord(val) {
        resTaskRecordService.getResourceTaskRecordByIncId(val)
            .then((res) => {
                this.setResTaskReord(val, res.data);
            }).catch(function (error) {
                console.error(error);
            });
    }

    @action.bound
    freshDispatchedRes(val) {
        resTaskRecordService.getDispatchedRes(val)
            .then((res) => {
                this.setDispatchedRes(val, res.data);
            }).catch(function (error) {
                console.error(error);
            });
    }

}

const resourceTask = new ResourceTask();

export default resourceTask;