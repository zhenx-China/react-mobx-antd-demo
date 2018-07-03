import React from 'react';
import { Tabs, Card,List } from 'antd';
import DetailList from '../../common/detailList.component';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { trace } from "mobx";
const TabPane = Tabs.TabPane;

const IncidentListDetail = inject('rootStore')(observer((props) =>{

    trace(true);
    const {resourceTask} = props.rootStore;
    const getMessage = props.intl.messages;

    //是否已调派资源
    function filterIsResTask(isResTask) {
        if (isResTask) {
            return getMessage.dispatched;
        } else {
            return getMessage.undispatch;
        }
    }

    function showResTaskList(item){
        return <List.Item>{item.name}</List.Item>;
    }

    function showResTaskRecord(item){
        return <List.Item>{item}</List.Item>;
    }

    return <Tabs defaultActiveKey="1">
        <TabPane tab={getMessage.detail} key="1">
            <Card>
                <p><b>{getMessage.note}:</b> {props.data.note}</p>
                <p><b>{getMessage.isDispatch}:</b> {filterIsResTask(props.data.isResTask)}</p>
            </Card>
        </TabPane>
        <TabPane tab={getMessage.dispatchedResList} key="2"><DetailList incId={props.data.id} 
        onInit={resourceTask.freshDispatchedRes}
        data = {resourceTask.dispatchedRes.get(props.data.id)}
        showItem = {showResTaskList}/></TabPane>
        <TabPane tab={getMessage.OperationLog} key="3"><DetailList incId={props.data.id} 
        onInit = {resourceTask.freshResTaskRecord}
        data = {resourceTask.resTaskReord.get(props.data.id)}
        showItem = {showResTaskRecord}/></TabPane>
    </Tabs>
}))

IncidentListDetail.propTypes = {
    data: PropTypes.object,
};

export default injectIntl(IncidentListDetail);