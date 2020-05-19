import React, { Component } from 'react';
import "../App.css";
import { Input } from "antd";
import { Redirect } from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName : "",
            redirect: false
        }
        this.io = null;
    }

    componentDidMount() {
    }

    handleChange = e =>{
        this.setState({userName : e.target.value});
    }

    onKeyPress = e => {
        if(e.which === 13 && e.target.value) {
            this.setState({redirect: true});
        }
    }

    render() {

        if(this.state.redirect) {
            return <Redirect to={{
                pathname: "/main",
                state: { userName:this.state.userName }
              }} />
        }

        return (
            <div className="firstpage">
                <div className="firstpage-input">
                    <h2>Enter your name</h2>
                    <Input onKeyPress ={this.onKeyPress} onChange = {this.handleChange} placeholder="@abc example" />
                </div>
            </div>
        );
    }
}

export default Home;