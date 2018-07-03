import React from 'react';
import { List } from 'antd';
import PropTypes from 'prop-types';

class DetailList extends React.Component {

    componentDidMount() {
        this.props.onInit(this.props.incId)
    }

    render() {
        return <List
            size="small"
            bordered
            locale={{ emptyText: "" }}
            dataSource={this.props.data}
            renderItem={this.props.showItem} />;
    }
}

DetailList.propTypes = {
    incId: PropTypes.string,
    onInit: PropTypes.func,
    data: PropTypes.object,
    showItem:PropTypes.func,
};

export default DetailList;