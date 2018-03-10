import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import './Anima';

import { setCurrentUser, setInitialData } from './redux/actions';

import MainPage from './components/MainPage';
import Missions from './components/Missions';
import Shinobies from './components/Shinobies';
import Profile from './components/Profile';

import "bootstrap/dist/css/bootstrap.css";
import { ListGroup, ListGroupItem, Grid, Row, Col } from "react-bootstrap";

const currentUser = localStorage.getItem('user');

export default class App extends Component {
    
    constructor(props) {
        super(props);
        
        this.initialRequest = this.initialRequest.bind(this);
    }
    
    componentWillMount() {
        if (currentUser) {
            this.props.storage.dispatch(setCurrentUser(JSON.parse(currentUser)));
        }
        if (!this.props.storage.senseis) {
            this.initialRequest();
        }
    }
    
    initialRequest() {
        const URL = '/initialRequest';
        const queryConfig = {
            method: 'GET'
        };
        
        fetch(URL, queryConfig)
            .then(response => (response.json()))
            .then(data => {
                this.props.storage.dispatch(setInitialData(data));
            });
    }
    
    render() {
        return (
            <Switch>
              <Route exact path='/'  component={MainPage}/>
              <Route exact path='/missions' component={Missions}/>
              <Route exact path='/shinobies' component={Shinobies}/>
              <Route exact path='/profiles' component={Profile}/>
            </Switch>
        )
    }
}