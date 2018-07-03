import { observable, action } from 'mobx';

class IncidentList {

    @observable incList = [];

    @observable selectIncId = 0;

    @observable unDisposalNum = 0;

    @observable add_visible =false;

    @observable resTask_visible = false;

    @observable isLoading = false;

    @action.bound
    add(inc) {
        this.incList = [...this.incList, inc];
        this.unDisposalNum = this.incList.filter(e => !e.isDisposal).length;
    }

    @action.bound
    selectInc(id) {
        this.selectIncId = id;
    }

    @action.bound
    disposalIncident(id) {
        this.incList = this.incList.map(m => {
            if (m.id === id) {
                m.isDisposal = true;
            }
            return m;
        });
        this.unDisposalNum = this.incList.filter(e => !e.isDisposal).length;
    }

    @action.bound
    initIncidentList(val) {
        this.incList = val;
    }

    @action.bound
    initUnDisposalNum(val) {
        if (this.incList.length <= 0) {
            this.unDisposalNum = val;
        } else {
            this.unDisposalNum = this.incList.filter(e => !e.isDisposal).length;
        }
    }

    @action.bound
    changeAddVisible(isShow) {
        this.add_visible = isShow;
    }

    @action.bound
    changeResTaskVisible(isShow) {
        this.resTask_visible = isShow;
    }

    @action.bound
    changeIsLoading(val) {
        this.isLoading = val;
    }
}

const incidentList = new IncidentList();

export default incidentList;