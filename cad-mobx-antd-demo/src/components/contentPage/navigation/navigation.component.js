import React from 'react';
import { inject, observer } from 'mobx-react';
import { Layout, Menu, Icon, Badge } from 'antd';
import incidentService from '../../../services/incident.service';
import { withRouter } from 'react-router';
import { injectIntl } from 'react-intl';
const { SubMenu } = Menu;
const { Sider } = Layout;

@inject("rootStore")
@observer
class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.incidentList = this.props.rootStore.incidentList;
        this.headerText = this.props.rootStore.headerText;
        this.getMessage = this.props.intl.messages;
        this.headerText.changeHeader(this.getMessage.toBeDisposal);
    }

    componentDidMount() {
        incidentService.getUnDisposalNum().then((response) => {
            this.incidentList.initUnDisposalNum(response.data);
        }).catch(function (error) {
            console.log(error);
        })
    }

    handleClick = (e) => {
        let headerText = '';
        const { history } = this.props;
        switch (e.key) {
            case 'todoList':
                headerText = this.getMessage.toBeDisposal;
                history.push('/incidents/toBeDisposal');
                break;
            case 'toDisposalList':
                headerText = this.getMessage.toBeDistribute;
                history.push('/incidents/toBeDistribute');
                break;
            case 'resList':
                headerText = this.getMessage.resources;
                history.push('/incidents/resources');
                break;
            default:
                headerText = 'none';
                break;
        }
        this.headerText.changeHeader(headerText);
    }

    render() {
        return <Sider>
            <Menu
                mode="inline"
                defaultSelectedKeys={['todoList']}
                defaultOpenKeys={['incidentList']}
                style={{ height: '100%', borderRight: 0 }}
                onClick={this.handleClick} >
                <SubMenu key="incidentList" title={<span><Icon type="form" />{this.getMessage.incidentList}</span>}>
                    <Menu.Item key="todoList">{this.getMessage.toBeDisposal}
                         <Badge count={this.incidentList.unDisposalNum} overflowCount={10}>
                        </Badge>
                    </Menu.Item>
                    <Menu.Item key="toDisposalList">{this.getMessage.toBeDistribute}</Menu.Item>
                </SubMenu>
                <SubMenu key="resList" title={<span><Icon type="table" />{this.getMessage.resources}</span>}>
                </SubMenu>
            </Menu>
        </Sider>
    }
}

export default injectIntl(withRouter(Navigation));