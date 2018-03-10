import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router-dom';

import { setCurrentUser } from '../../redux/actions';

import "bootstrap/dist/css/bootstrap.css";
import { FormControl, Button, Col } from "react-bootstrap";

import { getValue, cleanFields } from '../../helpers';

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: userData => dispatch(setCurrentUser(userData))
    };
};

class LogInView extends Component {
    
    _ids = ['name-login', 'pass-login'];
    
    constructor(props) {
        super(props);
        
        this.logIn = this.logIn.bind(this);
    }
    
    logIn() {
        const name = getValue('name-login');
        const password = getValue('pass-login');
        
        if (!name || !password) {
            alert('Fill all fields');
            cleanFields(this._ids);
            return;
        }
        const URL = `/user?password=${password}&name=${name}`;
        const queryConfig = {
            method: 'GET'
        };
        
        fetch(URL, queryConfig)
            .then(response => (response.json()))
            .then(data => {
                console.log(data);   
                if (!data.error) {
                    this.props.setCurrentUser(data);
                    localStorage.setItem('user', JSON.stringify(data));
                } else {
                    alert(data.error);
                }
            });
    }
    
    render() {
        
        return (
            <Col xs={3} md={3} className="log-in-column">
                <h1 className="enter-title">Enter</h1>
                <div className="log-in-wrapper">
                    <FormControl
                        id="name-login"
                        bsSize="large" 
                        type = "text"
                        placeholder="Enter your name">
                    </FormControl>
                    <FormControl
                        id="pass-login"
                        bsSize="large" 
                        type = "password"
                        placeholder="Enter your password">
                    </FormControl>
                    <Button bsStyle="info" bsSize="large" onClick={this.logIn}>
                        Log In
                    </Button>
                </div>
            </Col>
        ) 
    }
}

const LogIn = connect(null, mapDispatchToProps)(LogInView);
export default LogIn;