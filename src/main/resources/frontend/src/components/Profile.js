import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProfiles } from '../redux/actions';

import mainBg from '../../img/twilights.jpg';

import { 
    setupMainBg, 
    setupHeader, 
    setupBlankBlock, 
    entry 
} from '../Anima';

import "../../css/profileStyle.css";
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

const pageColor = 'rgb(255, 143, 31)';
const blankSkillsTemplate = 'Click to view skills';

const mapStateToProps = state => {
    return { 
        user: state.currentUser,
        profiles: state.profiles,
        senseis: state.senseis
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setProfiles: profiles => dispatch(setProfiles(profiles))
    };
};

class ProfileView extends Component {
    
    _sensei = '';
	
    constructor(props) {
        super(props);
        
        this.state = {
            showAdd: false,
            showEdit: false,
			iq: 1,
			power: 'middle',
            skills: 'no skills',
            rank: 'novice',
            clickedProfile: null
        };
        
        this.readMoreClick = this.readMoreClick.bind(this);
        this.handleAddClose = this.handleAddClose.bind(this);
		this.handleAddShow = this.handleAddShow.bind(this);
		this.handleEditClose = this.handleEditClose.bind(this);
		this.handleEditShow = this.handleEditShow.bind(this);
		this.onSenseiSelect = this.onSenseiSelect.bind(this);
		this.addNewProfile = this.addNewProfile.bind(this);
		this.onIqInput = this.onIqInput.bind(this);
		this.onPowerInput = this.onPowerInput.bind(this);
		this.onSkillsInput = this.onSkillsInput.bind(this);
		this.onRankInput = this.onRankInput.bind(this);
		this.editProfile = this.editProfile.bind(this);
		this.deleteProfile = this.deleteProfile.bind(this);
    }
    
    componentDidMount() {
        entry();
    }
    
    readMoreClick(e) {
		const clickedNode = (e.target.children[0] || e.target);
		const currentText = clickedNode.textContent;
		
		if (currentText == blankSkillsTemplate) {
			clickedNode.textContent = clickedNode.getAttribute('data-desc');
		} else {
			clickedNode.textContent = blankSkillsTemplate;
		}
    }
    
    handleAddClose () {
        this.setState({ 
			...this.state,
            showAdd: false, 
            iq: 1,
			power: 'middle',
            skills: 'no skills',
            rank: 'novice',
            clickedProfile: null
        });
        this._sensei = '';
    }
    
	handleAddShow () {
		this.setState({
			...this.state,
			showAdd: true
		});
	}

	handleEditClose () {
        this.setState({ 
			...this.state,
            showEdit: false, 
            iq: 1,
			power: 'middle',
            skills: 'no skills',
            rank: 'novice',
            clickedProfile: null
        });
    }
    
	handleEditShow (profile) {
		this.setState({
			...this.state,
			showEdit: true,
			clickedProfile: profile
		});
	}

	onSenseiSelect (eventKey, e) {
        this._sensei = eventKey;
    }

	addNewProfile () {
		const payload = {
            profile: {
                senseiName: this._sensei,
                iq: this.state.iq,
                power: this.state.power,
                rank: this.state.rank,
                skills: this.state.skills
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
        
        fetch('/addProfile', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
				this.props.setProfiles(data);
            });
        this.handleAddClose();
	}

	onIqInput (e) {
		this.setState({
            ...this.state,
            iq: e.target.value
        });
	}

	onPowerInput (e) {
		this.setState({
            ...this.state,
            power: e.target.value
        });
	}

    onSkillsInput (e) {
		this.setState({
            ...this.state,
            skills: e.target.value
        });
	}

    onRankInput (e) {
		this.setState({
            ...this.state,
            rank: e.target.value
        });
	}
	
	editProfile () {
		const payload = {
            id: this.state.clickedProfile.id,
            newProfile: {
                iq: this.state.iq,
                power: this.state.power,
                rank: this.state.rank,
                skills: this.state.skills,
                senseiName: this.state.clickedProfile.senseiName
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
        
        fetch('/updateProfile', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
				this.props.setProfiles(data);
            });
        this.handleEditClose();
	}

	deleteProfile (profile) {
		if (!confirm('Delete profile?')) {
			return;
		}
        const payload = {
            id: profile.id
        };
        const queryConfig = {
            method: 'POST', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        
        fetch('/deleteProfile', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
				this.props.setProfiles(data);
            });
        this.handleAddClose();
	}

    generateProfilesPdf () {
		window.location = '/generateProfilesPdf';
    }

    generateProfilesExcel () {
        window.location = '/generateProfilesExcel';
    }

    generateProfilesCsv () {
        window.location = '/generateProfilesCsv';
    }
    
    render() {
        const profiles = this.props.profiles;
        const senseis = this.props.senseis;
        return (
            <div className="main-bg-wrapper" style={ setupMainBg(mainBg) }>
                <Navigator className="twilight"/>
                <Header style={setupHeader(pageColor)}/>
                <div className="workfield" style={setupBlankBlock()}>
                    <Table className="table-profile-container" responsive>
                      <thead>
						<tr>
                          <th className="th-profile-container table-titile" colSpan="6">
                              <div>Profiles</div>
                          </th>
                        </tr>
                        <tr>
                          <th className="th-profile-container">
                              <div>
                                Sensei's Name
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                IQ
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                Power
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                Skills
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                Rank
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                Edit
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                Delete
                              </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {profiles.map((profile, index) => (
                            <tr key={index}>
                              <td className="td-profile-container">
                                  <div>
                                    {profile.senseiName}
                                  </div>
                              </td>
                              <td className="td-profile-container">
                                  <div>
                                    {profile.iq}
                                  </div>
                              </td>
                              <td className="td-profile-container">
                                  <div>
                                    {profile.power}
                                  </div>
                              </td>
                              <td className="td-profile-container view-description" onClick={this.readMoreClick}>
                                  <div data-desc={profile.skills}>
                                    {blankSkillsTemplate}
                                  </div>
                              </td>
                              <td className="td-profile-container">
                                  <div>
                                    {profile.rank}
                                  </div>
                              </td>
                              <td className="td-profile-container">
                                  <div>
                                      <Button 
                                          bsStyle="info" 
                                          bsSize="large"
                                          disabled={!this.props.user.isAdmin}
                                          onClick={() => {this.handleEditShow(profile)}}>
                                            Edit
                                      </Button>
                                  </div>
                              </td>
                              <td className="td-profile-container">
                                  <div>
                                      <Button 
                                          bsStyle="danger" 
                                          bsSize="large" 
                                          disabled={!this.props.user.isAdmin}
                                          onClick={() => {this.deleteProfile(profile)}}>
                                            Delete
                                      </Button>
                                  </div>
                                </td>
                            </tr>
                        ))}
                      </tbody>
					  <thead>
                        <tr>
                          <th className="th-profile-container">
                              <div>
                                Excel
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                PDF
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                CSV
                              </div>
                          </th>
                          <th className="th-profile-container" colSpan="4">
                              <div>
                                Add new profile
                              </div>
                          </th>
                        </tr>
                      </thead>
						<tbody>
						   <tr>
							  <td className="td-profile-container" >
                                  <div>
                                      <Button 
                                              bsStyle="success" 
                                              bsSize="large"       
                                              disabled={!this.props.profiles} 
                                              onClick={this.generateProfilesExcel}>
                                          Excel
                                      </Button>
                                  </div>
                              </td>
							  <td className="td-profile-container">
                                  <div>
                                    <Button 
                                          bsStyle="danger" 
                                          bsSize="large" 
                                          disabled={!this.props.profiles} 
                                          onClick={this.generateProfilesPdf}>
                                        PDF
                                    </Button>
                                  </div>
                              </td>
							  <td className="td-profile-container" >
                                  <div>
                                    <Button 
                                          bsStyle="warning" 
                                          bsSize="large" 
                                          disabled={!this.props.profiles} 
                                          onClick={this.generateProfilesCsv}>
                                        CSV
                                    </Button>
                                  </div>
                              </td>
							  <td className="td-profile-container td-add-container" colSpan="4">
								  <div>
                                    <Button 
                                          bsStyle="success" 
                                          bsSize="large" 
                                          disabled={!this.props.user.isAdmin}
                                          onClick={this.handleAddShow}>
                                        Add new
                                    </Button>
                                 </div>
							 </td>
						  </tr>
						</tbody>
                    </Table>
                                        
                    <Modal show={this.state.showAdd} onHide={this.handleAddClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Profiles
                        </Modal.Title>
                      </Modal.Header>
                         <Modal.Body>
                            <p>
                              Fill the fields before adding
                            </p>
                            <DropdownButton title="Sensei" bsStyle="default" id="2" bsSize="large">
                                {senseis.map((sensei, index) => (
                                    <MenuItem eventKey={sensei.name} key={index} onSelect={this.onSenseiSelect}>
                                        {sensei.name}
                                    </MenuItem>
                                ))}
                            </DropdownButton>
							<FormControl
                                    bsSize="large" 
                                    type = "number"
                                    placeholder="Enter IQ"
                                    value = {this.state.iq}
                                    onChange={this.onIqInput}>
                            </FormControl>
							<FormControl
                                    bsSize="large" 
                                    type="text"
                                    placeholder="Enter Power"
                                    value = {this.state.power}
                                    onChange={this.onPowerInput}>
                            </FormControl>
                            <FormControl
                                    bsSize="large" 
                                    type="text"
                                    placeholder="Enter Skills"
                                    value = {this.state.skills}
                                    onChange={this.onSkillsInput}>
                            </FormControl>
                            <FormControl
                                    bsSize="large" 
                                    type="text"
                                    placeholder="Enter Rank"
                                    value = {this.state.rank}
                                    onChange={this.onRankInput}>
                            </FormControl>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button 
                                    bsStyle="success" 
                                    onClick={this.addNewProfile}>
                                Done
                            </Button>
                          </Modal.Footer>
                    </Modal>
					
					<Modal show={this.state.showEdit} onHide={this.handleEditClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Profiles
                        </Modal.Title>
                      </Modal.Header>
                         <Modal.Body>
                            <p>
                              Fill the fields before adding
                            </p>
							<FormControl
                                    bsSize="large" 
                                    type = "number"
                                    placeholder="Enter IQ"
                                    value = {this.state.iq}
                                    onChange={this.onIqInput}>
                            </FormControl>
							<FormControl
                                    bsSize="large" 
                                    type="text"
                                    placeholder="Enter Power"
                                    value = {this.state.power}
                                    onChange={this.onPowerInput}>
                            </FormControl>
                            <FormControl
                                    bsSize="large" 
                                    type="text"
                                    placeholder="Enter Skills"
                                    value = {this.state.skills}
                                    onChange={this.onSkillsInput}>
                            </FormControl>
                            <FormControl
                                    bsSize="large" 
                                    type="text"
                                    placeholder="Enter Rank"
                                    value = {this.state.rank}
                                    onChange={this.onRankInput}>
                            </FormControl>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button 
                                    bsStyle="success" 
                                    onClick={this.editProfile}>
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

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileView);
export default Profile;
