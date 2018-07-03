import React from 'react';
import AddIncForm from './addIncForm.component';
import ResourceTaskForm from './resourceTaskForm.component';
import { inject, observer } from 'mobx-react';
import { Table, Divider, Button, Popconfirm, message, Tooltip, notification } from 'antd';
import IncidentListDetail from './incidentListDetail.component';
import incidentService from '../../../services/incident.service';
import resTaskRecordService from '../../../services/resTaskRecord.service';
import { injectIntl } from 'react-intl';

@inject('rootStore')
@observer
class IncidentList extends React.Component {

    constructor(props) {
        super(props);
        this.incidentList = this.props.rootStore.incidentList;
        this.resourceTask = this.props.rootStore.resourceTask;
        this.getMessage = this.props.intl.messages;
        this.formatMessage = this.props.intl.formatMessage;
        this.props.rootStore.headerText.changeHeader(this.getMessage.toBeDisposal);
        this.showAddForm = this.showAddForm.bind(this);
        this.handleAddOk = this.handleAddOk.bind(this);
        this.showResTaskForm = this.showResTaskForm.bind(this);
        this.handleResTaskCancel = this.handleResTaskCancel.bind(this);
        this.handleResTaskOk = this.handleResTaskOk.bind(this);
        this.notice = this.notice.bind(this);
        this.initData = this.initData.bind(this);
    }

    interval;

    notice() {
        notification.open({
            message: this.getMessage.undisposal,
            description: this.formatMessage({id:'undisposalInfo'},{num:this.incidentList.unDisposalNum})
        })
    }

    initData() {
        this.incidentList.changeIsLoading(true);
            incidentService.getIncidentList().then((response) => {
                this.incidentList.initIncidentList(response.data);
                this.incidentList.changeIsLoading(false);
            }).catch(function (error) {
                console.log(error);
                this.incidentList.changeIsLoading(false);
            })
    }

    componentDidMount() {
        if (this.incidentList.incList.length <= 0) {
            this.initData();
        }
        this.interval = setInterval(this.notice, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    //结束警情事件
    handleDisposalIncClick(id, num, e) {
        e.preventDefault();
        incidentService.disposalIncident(id).then((res)=>{
            this.incidentList.disposalIncident(id);
            message.success(this.formatMessage({id:'disposaledInfo'},{num:num}));
        }).catch(function(error){
            console.log(error);
        });
    }

    //新增警情窗口
    showAddForm(e) {
        e.preventDefault();
        this.incidentList.changeAddVisible(true);
    }

    handleAddOk = e => {
        e.preventDefault();
        const form = this.addFormRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let inc = {
                num: values.num,
                alarmNum: values.alarmNum,
                alarmAddress: values.alarmAddress,
                note: values.note,
            };
            incidentService.addIncident(inc).then((res)=>{
                this.incidentList.add(res.data);
                this.incidentList.changeAddVisible(false);
            }).catch(function (error) {
                console.error(error);
                this.incidentList.changeIsLoading(false);
            })
            
        });
    }

    handleAddCancel = e => {
        e.preventDefault();
        this.incidentList.changeAddVisible(false);
    }

    //资源调派窗口
    showResTaskForm(id, e) {
        e.preventDefault();
        this.incidentList.selectInc(id);
        this.incidentList.changeResTaskVisible(true);
    }

    handleResTaskCancel(e) {
        e.preventDefault();
        this.incidentList.changeResTaskVisible(false);
    }

    handleResTaskOk(e) {
        e.preventDefault();
        const form = this.resTaskformRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            resTaskRecordService.add({
                incId: this.incidentList.selectIncId,
                resIds: values.checkRes
            }).then((res)=>{
                this.incidentList.changeResTaskVisible(false);
                this.initData();
                this.resourceTask.freshResTaskRecord(this.incidentList.selectIncId);
                this.resourceTask.freshDispatchedRes(this.incidentList.selectIncId);
            }).catch(function(error){
                console.error(error);
                this.incidentList.changeResTaskVisible(false);
            });            
        });
    }

    render() {
        const columns = [
            {
                title: this.getMessage.incNum,
                dataIndex: 'num',
                key: 'num'
            }, {
                title: this.getMessage.alarmNum,
                dataIndex: 'alarmNum',
                key: 'alarmNum',
            }, {
                title: this.getMessage.alarmAddress,
                dataIndex: 'alarmAddress',
                key: 'alarmAddress',
            }, {
                title: this.getMessage.isDisposal,
                key: 'isDisposal',
                render: (record) => {
                    return record.isDisposal ? this.getMessage.disposaled : this.getMessage.undisposal;
                },
                filters: [
                    { text: this.getMessage.disposaled, value: true },
                    { text: this.getMessage.undisposal, value: false },
                ],
                onFilter: (value, record) => {
                    return record.isDisposal.toString() === value
                }
            }, {
                title: this.getMessage.operation,
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a onClick={this.showResTaskForm.bind(this, record.id)}>{this.getMessage.dispatchRes}</a>
                        <Divider type="vertical" />
                        <Popconfirm title={this.getMessage.confirmEndInc} onConfirm={this.handleDisposalIncClick.bind(this, record.id, record.num)} >
                            <a>{this.getMessage.endInc}</a>
                        </Popconfirm>
                    </span>
                ),
            }];
        return <div>
            <Tooltip title={this.getMessage.addInc} placement="rightTop" >
                <Button type="primary" icon="plus-circle-o" onClick={this.showAddForm}></Button>
            </Tooltip>
            <AddIncForm wrappedComponentRef={(formRef) => { this.addFormRef = formRef; }}
                onOk={this.handleAddOk}
                onCancel={this.handleAddCancel} 
                add_visible = {this.incidentList.add_visible}
            />
            <Table rowKey="id"
                columns={columns}
                dataSource={this.incidentList.incList.slice()}
                expandedRowRender={record => <IncidentListDetail data={record} />}
                pagination={{ showQuickJumper: true, defaultPageSize: 7 }}
                loading={this.incidentList.isLoading} />
            <ResourceTaskForm wrappedComponentRef={(formRef) => { this.resTaskformRef = formRef; }}
                onOk={this.handleResTaskOk}
                onCancel={this.handleResTaskCancel} />
        </div>;
    }
}

export default injectIntl(IncidentList);
