import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import { sendMessage } from '../services/chatServices';

class AllChat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            totalUser: 0,
            newMsg: []
        }
    }

    componentDidMount() {
    }


    onChange = (e) => {
        if (e.target.value) {
            this.setState({ msg: e.target.value });
        }
    }

    sendMessage = e => {
        let saveIoReducer = this.props.saveIoReducer;;
        if (saveIoReducer.io && e && saveIoReducer.userName) {
            sendMessage(saveIoReducer.io, e, saveIoReducer.userName);
            this.setState({ msg: '' });
            
        }
    }


    render() {
        let saveTotalUserReducer = this.props.saveTotalUserReducer;
        let saveIoReducer = this.props.saveIoReducer;
        let msgArr = this.props.getAllChatSuccessfulReducer;
        const renderMsg = msgArr.map((data, index) => {
            if (data.fromId === saveIoReducer.io.id) {
                return <div key ={index} className="mychat"> <span className="message-content mychat-content">{data.content}</span></div>
            } else {
                return <div key ={index} className="otherchat">
                    <span className="otherchat-content "><b>{data.from}</b> : <span className="message-content">{data.content}</span></span>
                </div>
            }
        })
        return (
            <div className="chat">
                <center><h1>{saveTotalUserReducer && saveTotalUserReducer.totalUser ? saveTotalUserReducer.totalUser : "..."} in this room</h1></center>
                <div className="chat-show">
                    {renderMsg}
                </div>
                <div className="chat-type">
                    <Input.Search
                        placeholder="hello"
                        enterButton="Send"
                        value={this.state.msg}
                        onChange={this.onChange}
                        size="large"
                        onSearch={this.sendMessage}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllChat);