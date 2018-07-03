import React from 'react';
import { Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
const FormItem = Form.Item;
const { TextArea } = Input;

const AddInc = injectIntl((props)=>{
        const getMessage = props.intl.messages;
        const formatMessage = props.intl.formatMessage
        const { onOk, onCancel, add_visible } = props;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <Modal title={getMessage.addInc}
                visible={add_visible}
                onCancel={onCancel}
                onOk={onOk}
                maskClosable={false}
                destroyOnClose={true}
            >
                <Form>
                    <FormItem {...formItemLayout} label={getMessage.incNum}>
                        {getFieldDecorator('num', {
                            rules: [{ required: true, message: formatMessage({id:'inputRequired'},{val:getMessage.incNum}) }],
                        })(
                            <Input placeholder={getMessage.incNum} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={getMessage.alarmNum}>
                        {getFieldDecorator('alarmNum', {
                            rules: [{ pattern: new RegExp("^[0-9]{11}$"), message: getMessage.phoneNumReg }],
                        })(
                            <Input placeholder={getMessage.alarmNum} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={getMessage.alarmAddress}>
                        {getFieldDecorator('alarmAddress', {
                            rules: [{ required: true, message: formatMessage({id:'inputRequired'},{val:getMessage.alarmAddress}) }],
                        })(
                            <Input placeholder={getMessage.alarmAddress} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={getMessage.note}>
                        {getFieldDecorator('note')(
                            <TextArea rows={4} placeholder={getMessage.note} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    });

AddInc.propTypes = {
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
};

const AddIncForm = Form.create()(AddInc);

export default AddIncForm;