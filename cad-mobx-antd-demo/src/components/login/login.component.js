import React from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Form, Icon, Input, Button, message } from 'antd';
import styles from './login.css';
import loginService from '../../services/login.service';
import { injectIntl, FormattedMessage } from 'react-intl';
const FormItem = Form.Item;

@inject("rootStore")
@observer
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.logstate = this.props.rootStore.logstate;
        this.getMessage = this.props.intl.messages;
        this.formatMessage = this.props.intl.formatMessage;
        this.props.rootStore.headerText.changeHeader(this.getMessage.login);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                loginService.login(values.userName, values.pwd)
                    .then((res) => {
                        if (res.data === "success") {
                            this.logstate.login(values.userName);
                            this.props.history.push('/incidents/toBeDisposal');
                        } else {
                            message.error('userName or password error');
                        }
                    }).catch(function (error) {
                        console.error(error);
                    });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            wrapperCol: {
                xs: { span: 6, offset: 11 },
                sm: { span: 8, offset: 8 },
            },
        };
        const iconStyle = {
            color: 'rgba(0,0,0,.25)'
        }
        return (
            <Form onSubmit={this.handleSubmit} className={styles.form}>
                <FormItem {...formItemLayout}>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: this.formatMessage({id:'inputRequired'},{val:this.getMessage.userName}) }],
                    })(
                        <Input prefix={<Icon type="user" style={iconStyle} />} placeholder={this.getMessage.userName} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout}>
                    {getFieldDecorator('pwd', {
                        rules: [{ required: true, message: this.formatMessage({id:'inputRequired'},{val:this.getMessage.pwd}) }],
                    })(
                        <Input prefix={<Icon type="lock" style={iconStyle} />} type="password" placeholder={this.getMessage.pwd} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout}>
                    <Button type="primary" htmlType="submit" className={styles.button}>
                        <FormattedMessage id="login">
                        </FormattedMessage>
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

Login = Form.create()(Login);

export default injectIntl(withRouter(Login));