import { observable, action } from 'mobx';

class HeaderText {

    @observable header;

    constructor(header) {
        this.header = header;
    }

    @action.bound
    changeHeader(header) {
        this.header = header;
    }
}

const headerText = new HeaderText('Login');

export default headerText;