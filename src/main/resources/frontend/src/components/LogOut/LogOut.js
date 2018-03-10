import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router-dom';

import { removeCurrentUser } from '../../redux/actions';

import "bootstrap/dist/css/bootstrap.css";
import { FormControl, Button, Col } from "react-bootstrap";

const mapDispatchToProps = dispatch => {
    return {
        removeCurrentUser: _ => dispatch(removeCurrentUser())
    };
};

class LogOutView extends Component {
    
    constructor(props) {
        super(props);
        
        this.logOut = this.logOut.bind(this);
    }
    
    logOut() {
        this.props.removeCurrentUser();
        localStorage.setItem('user', '');
    }
    
    render() {
        
        return (
            <Col xs={3} md={3} className="log-in-column">
                <h1 className="enter-title">Log Out</h1>
                <div className="log-in-wrapper">
                    <Button bsStyle="danger" bsSize="large" onClick={this.logOut}>
                        Log Out
                    </Button>
                </div>
            </Col>
        ) 
    }
}

const LogOut = connect(null, mapDispatchToProps)(LogOutView);
export default LogOut;