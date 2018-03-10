import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';

import "../../../css/footerStyle.css";
import "../../../css/fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, Button, Col } from "react-bootstrap";

export default class Footer extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <footer className="footer">
                <span>Designed by <span>Rinne</span></span>
                <span>Backend by <span>Artem</span></span>
                <span>Nothing by <span>Lesha</span></span>
            </footer>
        ) 
    }
}
