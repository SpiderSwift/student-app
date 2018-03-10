import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router-dom';


import menuIcon from '../../../img/menu.png';

import "../../../css/headerStyle.css";
import "../../../css/fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, Button, Col } from "react-bootstrap";

const mapStateToProps = state => {
    return { userName: state.currentUser.name };
};

class HeaderView extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <header className="header" style={ this.props.style || {} }>
                <p className="logo-text" >{this.props.userName || 'Rinne Six Paths'}</p>
                <img src={menuIcon} className="menu-icon"/>
            </header>
        ) 
    }
}

const Header = connect(mapStateToProps)(HeaderView);
export default Header;
