import React, { Component } from 'react';
import "../App.css";
import MyMenu from './MyMenu'
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import { connect } from "react-redux";
import { saveIoRef, getTotalUser, getPrivateChat, getAllChat } from '../redux/action';

class Main extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            connect: false
        }
        this.io = null;
    }

    componentDidMount() {
        this.checkAuthen();
    }


    checkAuthen = () => {
        const props = this.props.location;
        if (!props.state) {
            this.setState({ redirect: true });
        } else {
            this.ioConnect(props.state.userName);
        }
    }

    ioConnect = (userName) => {
        const ioInstance = io.connect('http://localhost:3030/all');
        ioInstance.emit("userConnect", { userName: userName });
        this.props.saveIo(ioInstance, userName);
        this.next()
    }


    next = () => {
        this.props.getTotalUser();
        this.props.getChat();
        this.props.getPrivateChat();
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={{
                pathname: "/",
            }} />
        }

        return (
            <MyMenu/>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveIo: (io, userName) => {
            dispatch(saveIoRef(io, userName))
        },
        getTotalUser:() => {
            dispatch(getTotalUser());
        },
        getChat: () => {
            dispatch(getAllChat());
        },
        getPrivateChat: () => {
            dispatch(getPrivateChat());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);