import React, { Component } from 'react';
import { AppstoreOutlined, MailOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { Menu, Tabs } from "antd";
import io from 'socket.io-client';
import AllChat from './AllChat';
import PrivateChat from './PrivateChat';
import { connect } from 'react-redux';

const { SubMenu } = Menu;
const { TabPane } = Tabs;

class MyMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: {},
            msg: "",
            totalUser: 0,
            notifyUserConnect: "",
            newMsg: [],
            redirect: false
        }
    }

    componentDidMount() {
    }


    render() {
        let userList = this.props.getUserListSuccessfulReducer || {};

        const renderUser = Object.keys(userList).map((data, index) =>
            <TabPane className="mainscreen" tab={userList[data]} key={++index} icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}>
                <PrivateChat userId={data} />
            </TabPane>
        );

        return (
            <Tabs defaultActiveKey="1" tabPosition={"left"}>
                <TabPane disabled className="mainscreen" tab={"User name : " + this.props.saveIoReducer.userName} key={-1}  >
                </TabPane>
                <TabPane className="mainscreen" tab={"Community"} key={0}  >
                    <AllChat />
                </TabPane>
                {renderUser}
            </Tabs>
        );
    }
}


const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(MyMenu);