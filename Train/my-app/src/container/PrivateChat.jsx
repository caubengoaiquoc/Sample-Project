import React, { Component } from 'react';
import { Input } from 'antd';
import { sendPrivateMessage } from '../services/chatServices';
import { connect } from 'react-redux';
import { getPrivateChatSuccessful } from '../redux/action';

class PrivateChat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            newMsg: []

        }
    }

    onChange = (e) => {
        if (e.target.value) {
            this.setState({ msg: e.target.value });
        }
    }

    sendMessage = e => {
        if (e) {
            let saveIoReducer = this.props.saveIoReducer;;
            if (saveIoReducer.io && e && saveIoReducer.userName && this.props.userId) {
                sendPrivateMessage(saveIoReducer.io, e, saveIoReducer.io.id, saveIoReducer.userName, this.props.userId);
                this.props.addChat({ content: e, from: saveIoReducer.io.id, userName: saveIoReducer.userName, to: this.props.userId });
                this.setState({ msg: '' });
            }
        }
    }

    render() {
        let saveIoReducer = this.props.saveIoReducer;
        let msgArr = this.props.getPrivateChatSuccessfulReducer;
        const renderMsg = msgArr.map((data, index) => {
            if (data.to === this.props.userId && data.from === saveIoReducer.io.id) {
                return <div key={index} className="mychat"> <span className="message-content mychat-content">{data.content}</span></div>
            }
            if (data.to === saveIoReducer.io.id && this.props.userId === data.from) {
                return <div key={index} className="otherchat">
                    <span className="otherchat-content "><b>{data.userName}</b> : <span className="message-content">{data.content}</span></span>
                </div>
            }
        })
        return (
            <div className="chat">
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
        addChat: (data) => {
            dispatch(getPrivateChatSuccessful(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateChat);