import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';


import menuIcon from '../../../img/menu.png';

import "../../../css/navStyle.css";
import "../../../css/fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, Button, Col } from "react-bootstrap";

export default class Navigator extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <nav className="anima-navbar">
                <Link to={{ pathname: '/'}} className={"redirect-link "+this.props.className}>Main page</Link>
                <Link to={{ pathname: '/missions'}} className={"redirect-link "+this.props.className}>Missions</Link>
                <Link to={{ pathname: '/shinobies'}} className={"redirect-link "+this.props.className}>Shinobies</Link>
                <Link to={{ pathname: '/profiles'}} className={"redirect-link "+this.props.className}>Profiles</Link>
                <a href="#" className={"view-footer "+this.props.className}>View authors</a>
            </nav>
        ) 
    }
}
