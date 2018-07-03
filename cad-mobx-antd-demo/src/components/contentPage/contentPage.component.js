import React from 'react';
import IncidentList from './toBeDisposalIncList/incidentList.component';
import { withRouter } from 'react-router';
import { Layout } from 'antd';
import ToBeDistributeIncList from './toBeDistributeIncList/toBeDistributeIncList.component';
import Navigation from './navigation/navigation.component';
import PrivateRoute from '../common/privateRouter.component';
const { Content } = Layout;

function ContentPage() {

    return <Layout>
        <Navigation />
        <Content>
            <PrivateRoute path='/incidents/toBeDisposal' component={IncidentList}></PrivateRoute>
            <PrivateRoute path='/incidents/toBeDistribute' component={ToBeDistributeIncList}></PrivateRoute>
        </Content>
    </Layout>
}

export default withRouter(ContentPage);