import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setupMainBg, setupHeader, entry } from '../Anima';

import mainBg from '../../img/firewatch.jpg';
import swipe from '../../img/swipe.png';

import "../../css/mainPageStyle.css";
import "../../css/fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, Button, Col } from "react-bootstrap";

import Header from './Header/Header';
import Navigator from './Navigator/Navigator';
import Footer from './Footer/Footer';
import LogIn from './LogIn/LogIn';
import LogOut from './LogOut/LogOut';

import { getValue, cleanFields } from '../helpers';

const pageColor = 'rgb(0, 180, 195)';

const mapStateToProps = state => {
    return { userName: state.currentUser.name };
};

class MainPageView extends Component {
    
    _ids = ['name-input', 'pass-input', 'confirm-input'];
    
    constructor(props) {
        super(props);
        
        this.register = this.register.bind(this);
    }
    
    componentDidMount() {
        entry();
    }
    
    register() {
        const name = getValue('name-input');
        const password = getValue('pass-input');
        const confirmPassword = getValue('confirm-input');
        
        if (!name || !password || !confirmPassword) {
            alert('Fill all fields');
            cleanFields(this._ids);
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords are wrong');
            cleanFields(this._ids);
            return;
        }
        const payload = {
            name: name,
            password: password,
            isAdmin: false,
            missions: []
        };
        const queryConfig = {
            method: 'POST', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        
        fetch('/register', queryConfig)
             .then(response => (response.json()))
             .then(data => {
                console.log(data);
                cleanFields(this._ids);
             });
    }
    
    render() {
        
        return (
                <div className="main-bg-wrapper" style={setupMainBg(mainBg)}>
                    <Navigator className="main"/>
                    <Header style={setupHeader(pageColor)}/>
                    <div className="anima-wrapper">                
                        <p className="greetings" >Rinne Six Paths</p>
                        <span className="customer-wrapper">
                            <span className="customer-text" >Become our lovely customer</span>
                            <span className="swipe-text">Wheel to enter</span>
                            <img src={swipe} className="wheel"/>
                        </span>
                    </div>
                    <div className="reg-wrapper" >
                        <Col xs={3} md={3} className="log-in-column">
                            <h1 className="enter-title">Register</h1>
                            <div className="log-in-wrapper">
                                <FormControl 
                                    id="name-input"
                                    bsSize="large" 
                                    type = "text"
                                    placeholder="Enter your name">
                                </FormControl>
                                <FormControl
                                    id="pass-input"
                                    bsSize="large" 
                                    type = "password"
                                    placeholder="Enter your password">
                                </FormControl>
                                <FormControl
                                    id="confirm-input"
                                    bsSize="large" 
                                    type = "password"
                                    placeholder="Confirm your password">
                                </FormControl>
                                <Button bsStyle="success" bsSize="large" onClick={this.register}>Register</Button>
                            </div>
                        </Col>
                        <p>Or</p>  
                        {(() => {
                            if (!this.props.userName) {
                                return (
                                    <LogIn />
                                )
                            } else {
                                return (
                                    <LogOut />
                                )    
                            }
                        })()} 
                    </div>
                    <Footer />
                </div>
        ) 
    }
}

const MainPage = connect(mapStateToProps)(MainPageView);
export default MainPage;