import React from 'react';
import Login from './login/login.component';
import styles from './app.css';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import ContentPage from './contentPage/contentPage.component';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import { injectIntl } from 'react-intl';
import PrivateRoute from './common/privateRouter.component';
const { Header, Footer, Content } = Layout;

@inject("rootStore")
@observer
class App extends React.Component {

  constructor(props) {
    super(props);
    this.logstate = this.props.rootStore.logstate;
    this.headerText = this.props.rootStore.headerText;
    this.getMessage = this.props.intl.messages;
  }

  render() {
    return (
      <Layout>
        <Header className={styles.antLayoutHeader}>
          <div className={styles.fontTitle}>{this.headerText.header}</div>
          <div className={styles.fontRight}>{this.logstate.isLogin ? this.getMessage.currentUser + this.logstate.userName : ''}</div>
        </Header>
        <Content>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path='/login' component={Login}></Route>
            <PrivateRoute path='/incidents' component={ContentPage}></PrivateRoute>
            <Route component={Login} />
          </Switch>
        </Content>
        <Footer className={styles.textCenter}>copyright:hxw</Footer>
      </Layout>
    )
  }
}

export default injectIntl(withRouter(App));