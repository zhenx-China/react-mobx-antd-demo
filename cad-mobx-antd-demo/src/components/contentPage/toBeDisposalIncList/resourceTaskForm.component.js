import React from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Form, Checkbox } from 'antd';
import resourceService from '../../../services/resource.service';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

@inject('rootStore')
@observer
class ResourceTask extends React.Component {

    constructor(props) {
        super(props);
        this.incidentList = props.rootStore.incidentList;
        this.resourceTask = props.rootStore.resourceTask;
        this.getMessage = this.props.intl.messages;
    }

    opt = [];

    componentDidMount() {
        resourceService.getResourceList()
        .then((res)=>{
            this.resourceTask.initResList(res.data);
            this.opt = res.data.map((res) => {
                    return {
                        label: res.name,
                        value: res.id
                    }});
        }).catch(function(error){
            console.error(error);
        });
    }

    render() {
        const { resTask_visible } = this.props.rootStore.incidentList;
        const { onOk, onCancel } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal title={this.getMessage.dispatchRes}
                    visible={resTask_visible}
                    onOk={onOk}
                    onCancel={onCancel}
                    maskClosable={false}
                    destroyOnClose={true}
                >
                    <Form>
                        <FormItem>
                            {getFieldDecorator('checkRes')(<CheckboxGroup options={this.opt} />)}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

ResourceTask.propTypes = {
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
};

const ResourceTaskForm = Form.create()(ResourceTask);

export default injectIntl(ResourceTaskForm);