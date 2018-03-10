import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router-dom';
import { store } from '../redux/store';
import { setCurrentUser } from '../redux/actions';

import mainBg from '../../img/night.jpg';
import swipe from '../../img/swipe.png';

import { 
    setupMainBg, 
    setupHeader, 
    setupBlankBlock, 
    entry 
} from '../Anima';

import "../../css/missionStyle.css";
import "../../css/fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { 
    FormControl, 
    Button,
    Col,
    Table,
    Well, 
    Modal,
    DropdownButton,
    MenuItem 
} from "react-bootstrap";

import Header from './Header/Header';
import Navigator from './Navigator/Navigator';
import Footer from './Footer/Footer';

const pageColor = 'rgb(31, 134, 255)';
const blankDescriptionTemplate = 'Click to view description';

const mockPrices = [10, 100, 500, 1000, 5000, 10000];
const mockRanks = ['S', 'A', 'B', 'C', 'D'];

const mapStateToProps = state => {
    return { 
        missions: state.currentUser.missions,
        senseis: state.senseis
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: userData => dispatch(setCurrentUser(userData))
    };
};

class MissionsView extends Component {
    
    _sensei = '';
    _rank = '';
    _price = 10;

    
    constructor (props) {
        super(props);
		
        this.state = {
            show: false,
            editing: false,
            description: 'Some description',
            clickedMission: null
        };
		this.readMoreClick = this.readMoreClick.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addNewMission = this.addNewMission.bind(this);
        this.onSenseiSelect = this.onSenseiSelect.bind(this);
        this.onPriceSelect = this.onPriceSelect.bind(this);
        this.onRankSelect = this.onRankSelect.bind(this);
        this.onDescptionInput = this.onDescptionInput.bind(this);
        this.editMission = this.editMission.bind(this);
        this.handleEditShow = this.handleEditShow.bind(this);
        this.deleteMission = this.deleteMission.bind(this);
        this.generateMissionsPdf = this.generateMissionsPdf.bind(this);
        this.generateMissionsExcel = this.generateMissionsExcel.bind(this);
        this.generateMissionsCsv = this.generateMissionsCsv.bind(this);
    }
    
    componentDidMount () {
        entry();
    }
	
	readMoreClick (e) {
		const clickedNode = (e.target.children[0] || e.target);
		const currentText = clickedNode.textContent;
		
		if (currentText == blankDescriptionTemplate) {
			clickedNode.textContent = clickedNode.getAttribute('data-desc');
		} else {
			clickedNode.textContent = blankDescriptionTemplate;
		}
    }
    
    handleClose () {
        this.setState({ 
            show: false, 
            description: 'Some description',
            editing: false,
            clickedMission: null
        });
        this._rank = '';
        this._price = 10;
        this._sensei = '';
    }

    handleShow () {
      this.setState({
          ...this.state,
          show: true
      });
    }

    handleEditShow (mission) {
      this.setState({ 
          ...this.state,
          show: true,
          editing: true,
          clickedMission: mission
      });
    }
    
    addNewMission (e) {
        const payload = {
            user: store.getState().currentUser,
            mission: {
                rank: this._rank,
                price: this._price,
                sensei: this._sensei,
                description: this.state.description
            }
        };
        const queryConfig = {
            method: 'POST', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        
        fetch('/addMission', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
				this.props.setCurrentUser(data);
                localStorage.setItem('user', JSON.stringify(data));
            });
        this.handleClose();
    }
    
    onSenseiSelect (eventKey, e) {
        this._sensei = eventKey;
    }

    onPriceSelect (eventKey, e) {
        this._price = eventKey;
    }
    
    onRankSelect (eventKey, e) {
        this._rank = eventKey;
    }

    onDescptionInput (e) {
        this.setState({
            ...this.state,
            description: e.target.value
        });
    }

    deleteMission (mission) {
		if (!confirm('Delete mission?')) {
			return;
		}
        const payload = {
            user: store.getState().currentUser,
            id: mission.id
        };
        const queryConfig = {
            method: 'POST', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        
        fetch('/deleteMission', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
				this.props.setCurrentUser(data);
                localStorage.setItem('user', JSON.stringify(data));
            });
        this.handleClose();
    }

    editMission () {
        const payload = {
            user: store.getState().currentUser,
			id: this.state.clickedMission.id,
            newMission: {
                rank: this._rank,
                price: this._price,
                sensei: this._sensei,
                description: this.state.description
            }
        };
        const queryConfig = {
            method: 'POST', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        
        fetch('/updateMission', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
				this.props.setCurrentUser(data);
                localStorage.setItem('user', JSON.stringify(data));
            });
        this.handleClose();
    }

    generateMissionsPdf () {
		window.location = '/generateMissionsPdf';
    }

    generateMissionsExcel () {
        window.location = '/generateMissionsExcel';
    }

    generateMissionsCsv () {
        window.location = '/generateMissionsCsv';
    }
    
    render() {
		const missions = this.props.missions || [];
		const senseis = this.props.senseis || [];
		const prices = mockPrices;
		const ranks = mockRanks;
		
        return (
            <div className="main-bg-wrapper" style={setupMainBg(mainBg)}>
                <Navigator className="night"/>
                <Header style={setupHeader(pageColor)}/>
                <div className="workfield" style={setupBlankBlock()}>
                    <Table className="table-mission-container" responsive>
                      <thead>
						<tr>
                          <th className="th-mission-container table-titile" colSpan="6">
                              <div>Missions</div>
                          </th>
                        </tr>
                        <tr>
                          <th className="th-mission-container">
                              <div>
                                Rank
                              </div>
                          </th>
                          <th className="th-mission-container">
                              <div>
                                Price $
                              </div>
                          </th>
                          <th className="th-mission-container">
                              <div>
                                Sensei
                              </div>
                          </th>
                          <th className="th-mission-container">
                              <div>
                                Description
                              </div>
                          </th>
                          <th className="th-mission-container">
                              <div>
                                Edit
                              </div>
                          </th>
                          <th className="th-mission-container">
                              <div>
                                Delete
                              </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {missions.map((mission, index) => (
                            <tr key={index}>
                              <td className="td-mission-container">
                                  <div>
                                    {mission.rank}
                                  </div>
                              </td>
                              <td className="td-mission-container">
                                  <div>
                                    {mission.price}
                                  </div>
                              </td>
                              <td className="td-mission-container">
                                  <div>
                                    {mission.sensei}
                                  </div>
                              </td>
                              <td className="td-mission-container view-description" onClick={this.readMoreClick}>
                                  <div data-desc={mission.description}>
                                    {blankDescriptionTemplate}
                                  </div>
                              </td>
                              <td className="td-mission-container">
                                  <div>
                                      <Button 
                                          bsStyle="info" 
                                          bsSize="large" 
                                          onClick={() => {this.handleEditShow(mission)}}>
                                            Edit
                                      </Button>
                                  </div>
                              </td>
                              <td className="td-mission-container">
                                  <div>
                                      <Button 
                                          bsStyle="danger" 
                                          bsSize="large" 
                                          onClick={() => {this.deleteMission(mission)}}>
                                            Delete
                                      </Button>
                                  </div>
                                </td>
                            </tr>
                        ))}
                      </tbody>
					  <thead>
                        <tr>
                          <th className="th-mission-container">
                              <div>
                                Excel
                              </div>
                          </th>
                          <th className="th-mission-container">
                              <div>
                                PDF
                              </div>
                          </th>
                          <th className="th-mission-container">
                              <div>
                                CSV
                              </div>
                          </th>
                          <th className="th-mission-container" colSpan="3">
                              <div>
                                Add new mission
                              </div>
                          </th>
                        </tr>
                      </thead>
						<tbody>
						   <tr>
							  <td className="td-mission-container" >
                                  <div>
                                      <Button 
                                              bsStyle="success" 
                                              bsSize="large"       
                                              disabled={!this.props.missions} 
                                              onClick={this.generateMissionsExcel}>
                                          Excel
                                      </Button>
                                  </div>
                              </td>
							  <td className="td-mission-container">
                                  <div>
                                    <Button 
                                          bsStyle="danger" 
                                          bsSize="large" 
                                          disabled={!this.props.missions} 
                                          onClick={this.generateMissionsPdf}>
                                        PDF
                                    </Button>
                                  </div>
                              </td>
							  <td className="td-mission-container" >
                                  <div>
                                    <Button 
                                          bsStyle="warning" 
                                          bsSize="large" 
                                          disabled={!this.props.missions} 
                                          onClick={this.generateMissionsCsv}>
                                        CSV
                                    </Button>
                                  </div>
                              </td>
							  <td className="td-mission-container" colSpan="3">
								  <div>
                                    <Button 
                                          bsStyle="success" 
                                          bsSize="large" 
                                          onClick={this.handleShow} 
                                          disabled={!this.props.missions}>
                                        Add new
                                    </Button>
                                 </div>
							 </td>
						  </tr>
						</tbody>
                    </Table>
                     <Modal show={this.state.show} onHide={this.handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Mission
                        </Modal.Title>
                      </Modal.Header>
                         <Modal.Body>
                            <p>
                              Fill the fields before adding
                            </p>
                            <DropdownButton title="Rank" bsStyle="default" id="1" bsSize="large">
                              {ranks.map((item, index) => (
                                    <MenuItem eventKey={item} key={index} onSelect={this.onRankSelect}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </DropdownButton>
                            <DropdownButton title="Price" bsStyle="default" id="2" bsSize="large">
                              {prices.map((item, index) => (
                                    <MenuItem eventKey={item} key={index} onSelect={this.onPriceSelect}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </DropdownButton>
                            <DropdownButton title="Sensei" bsStyle="default" id="2" bsSize="large">
                                {senseis.map((sensei, index) => (
                                    <MenuItem eventKey={sensei.name} key={index} onSelect={this.onSenseiSelect}>
                                        {sensei.name}
                                    </MenuItem>
                                ))}
                            </DropdownButton>
                            <FormControl
                                    bsSize="large" 
                                    type = "text"
                                    placeholder="Enter description"
                                    value = {this.state.description}
                                    onChange={this.onDescptionInput}>
                            </FormControl>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button 
                                    bsStyle="success" 
                                    onClick={this.state.editing ? this.editMission : this.addNewMission}>
                                Done
                            </Button>
                          </Modal.Footer>
                    </Modal>
                </div>
                <Footer />
            </div>
        )
    }
}

const Missions = connect(mapStateToProps, mapDispatchToProps)(MissionsView);
export default Missions;