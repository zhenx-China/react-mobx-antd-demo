import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.component';
import { BrowserRouter } from 'react-router-dom';
import { configure } from 'mobx';
import rootStore from './stores/rootStore';
import { Provider } from 'mobx-react';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { IntlProvider, addLocaleData } from 'react-intl';
import zhCN from './i18n/zh-CN';  //导入 i18n 配置文件
// import enUS from './i18n/en-US';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';

configure({ enforceActions: true }); // 不允许在动作之外进行状态修改

addLocaleData([...en, ...zh]);

ReactDOM.render(
    <IntlProvider locale='zh' messages={zhCN}>
        <Provider rootStore={rootStore}>
            <BrowserRouter>
                <LocaleProvider locale={zh_CN}>
                    <App />
                </LocaleProvider>
            </BrowserRouter>
        </Provider>
     </IntlProvider>,
    document.getElementById('root'));