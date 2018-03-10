import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setStudents, setSenseis } from '../redux/actions';

import mainBg from '../../img/shinobies.jpg';

import { 
    setupMainBg, 
    setupHeader, 
    setupBlankBlock, 
    entry 
} from '../Anima';

import "../../css/shinobiStyle.css";
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

const pageColor = 'rgb(145, 183, 199)';

const mapStateToProps = state => {
    return { 
        user: state.currentUser,
        senseis: state.senseis,
        students: state.students
    };
};

const mapDispatchToProps = dispatch => {
    return {
		setStudents: students => dispatch(setStudents(students)),
		setSenseis: senseis => dispatch(setSenseis(senseis))
    };
};

class ShinobiesView extends Component {
	
	_sensei = '';
	_student = '';
	
    constructor(props) {
        super(props);
		
		this.state = {
            showAddStudent: false,
            showEditStudent: false,
			studentName: 'Student Name',
			studentAge: 12,
            clickedStudent: null,
			showAddSensei: false, 
			showEditSensei: false, 
            senseiName: 'Sensei Name',
            senseiMissions: 12,
            clickedSensei: null
        };
		
		this.handleAddStudentClose = this.handleAddStudentClose.bind(this);
		this.handleAddStudentShow = this.handleAddStudentShow.bind(this);
		this.handleEditStudentClose = this.handleEditStudentClose.bind(this);
		this.handleEditStudentShow = this.handleEditStudentShow.bind(this);
		this.onSenseiSelect = this.onSenseiSelect.bind(this);
		this.addNewStudent = this.addNewStudent.bind(this);
		this.onStudentNameInput = this.onStudentNameInput.bind(this);
		this.onStudentAgeInput = this.onStudentAgeInput.bind(this);
		this.editStudent = this.editStudent.bind(this);
		this.deleteStudent = this.deleteStudent.bind(this);
		//////////////////////////////////////////////////////////////
		this.handleAddSenseiClose = this.handleAddSenseiClose.bind(this);
		this.handleAddSenseiShow = this.handleAddSenseiShow.bind(this);
		this.handleEditSenseiClose = this.handleEditSenseiClose.bind(this);
		this.handleEditSenseiShow = this.handleEditSenseiShow.bind(this);
		this.onStudentSelect = this.onStudentSelect.bind(this);
		this.addNewSensei = this.addNewSensei.bind(this);
		this.onSenseiNameInput = this.onSenseiNameInput.bind(this);
		this.onSenseiMissionsInput = this.onSenseiMissionsInput.bind(this);
		this.editSensei = this.editSensei.bind(this);
		this.deleteSensei = this.deleteSensei.bind(this);
    }
    
    componentDidMount() {
        entry();
    }
	
	handleAddStudentClose () {
        this.setState({ 
			...this.state,
            showAddStudent: false, 
            studentName: 'Student Name',
            studentAge: 12,
            clickedStudent: null
        });
        this._sensei = '';
    }
    
	handleAddStudentShow () {
		this.setState({
			...this.state,
			showAddStudent: true
		});
	}

	handleEditStudentClose () {
        this.setState({ 
			...this.state,
            showEditStudent: false, 
            studentName: 'Student Name',
            studentAge: 12,
            clickedStudent: null
        });
    }
    
	handleEditStudentShow (student) {
		this.setState({
			...this.state,
			showEditStudent: true,
			clickedStudent: student
		});
	}

	onSenseiSelect (eventKey, e) {
        this._sensei = eventKey;
    }

	addNewStudent () {
		const payload = {
            student: {
                name: this.state.studentName,
                age: this.state.studentAge,
                senseiName: this._sensei
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
        
        fetch('/addStudent', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
				this.props.setStudents(data);
            });
        this.handleAddStudentClose();
	}

	onStudentNameInput (e) {
		this.setState({
            ...this.state,
            studentName: e.target.value
        });
	}

	onStudentAgeInput (e) {
		this.setState({
            ...this.state,
            studentAge: e.target.value
        });
	}
	
	editStudent () {
		const payload = {
            id: this.state.clickedStudent.id,
            newStudent: {
                name: this.state.studentName,
                age: this.state.studentAge,
                senseiName: this.state.clickedStudent.senseiName
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
        
        fetch('/updateStudent', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
				this.props.setStudents(data);
            });
        this.handleEditStudentClose();
	}

	deleteStudent (student) {
		if (!confirm('Delete student?')) {
			return;
		}
        const payload = {
            id: student.id
        };
        const queryConfig = {
            method: 'POST', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        
        fetch('/deleteStudent', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
				this.props.setStudents(data);
            });
        this.handleAddStudentClose();
	}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	handleAddSenseiClose () {
        this.setState({ 
			...this.state,
            showAddSensei: false, 
            senseiName: 'Sensei Name',
            senseiMissions: 12,
            clickedSensei: null
        });
        this._student = '';
    }
    
	handleAddSenseiShow () {
		this.setState({
			...this.state,
			showAddSensei: true
		});
	}

	handleEditSenseiClose () {
        this.setState({ 
			...this.state,
            showEditSensei: false, 
            senseiName: 'Sensei Name',
            senseiAge: 12,
            clickedSensei: null
        });
    }
    
	handleEditSenseiShow (sensei) {
		this.setState({
			...this.state,
			showEditSensei: true,
			clickedSensei: sensei
		});
	}

	onStudentSelect (eventKey, e) {
        this._student = eventKey;
    }

	addNewSensei () {
		const payload = {
            sensei: {
                name: this.state.senseiName,
                missionsCompleted: this.state.senseiMissions,
                student: this._student
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
        
        fetch('/addSensei', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
				this.props.setSenseis(data); //TODO
            });
        this.handleAddSenseiClose();
	}

	onSenseiNameInput (e) {
		this.setState({
            ...this.state,
            senseiName: e.target.value
        });
	}

	onSenseiMissionsInput (e) {
		this.setState({
            ...this.state,
            senseiMissions: e.target.value
        });
	}
	
	editSensei () {
		const payload = {
            id: this.state.clickedSensei.id,
            newSensei: {
                name: this.state.senseiName,
                missionsCompleted: this.state.senseiMissions,
                student: this.state.clickedSensei.student
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
        
        fetch('/updateSensei', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
				this.props.setSenseis(data);
            });
        this.handleEditSenseiClose();
	}

	deleteSensei (sensei) {
		if (!confirm('Delete sensei?')) {
			return;
		}
        const payload = {
            id: sensei.id
        };
        const queryConfig = {
            method: 'POST', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        
        fetch('/deleteSensei', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
				this.props.setSenseis(data);
            });
        this.handleAddSenseiClose();
	}

    generateStudentsPdf () {
		window.location = '/generateStudentsPdf';
    }

    generateStudentsExcel () {
        window.location = '/generateStudentsExcel';
    }

    generateStudentsCsv () {
        window.location = '/generateStudentsCsv';
    }

    generateSenseisPdf () {
		window.location = '/generateSenseisPdf';
    }

    generateSenseisExcel () {
        window.location = '/generateSenseisExcel';
    }

    generateSenseisCsv () {
        window.location = '/generateSenseisCsv';
    }

    render() {
        const shinobies = this.props.senseis;
        const students = this.props.students;
        return (
            <div className="main-bg-wrapper" style={ setupMainBg(mainBg) }>
                <Navigator className="breed"/>
                <Header style={ setupHeader(pageColor) }/>
                <div className="workfield" style={setupBlankBlock()}>
                    <Table className="table-shinobi-container" responsive>
                      <thead>
						<tr>
                          <th className="th-shinobi-container table-titile" colSpan="6">
                              <div>Students</div>
                          </th>
                        </tr>
                        <tr>
                          <th className="th-shinobi-container">
                              <div>
                                Name
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Age
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Sensei's Name
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Edit
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Delete
                              </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                              <td className="td-shinobi-container">
                                  <div>
                                    {student.name}
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                    {student.age}
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                    {student.senseiName}
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                      <Button 
                                          bsStyle="info" 
                                          bsSize="large"
                                          disabled={!this.props.user.isAdmin}
                                          onClick={() => {this.handleEditStudentShow(student)}}>
                                            Edit
                                      </Button>
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                      <Button 
                                          bsStyle="danger" 
                                          bsSize="large"
                                          disabled={!this.props.user.isAdmin}
                                          onClick={() => {this.deleteStudent(student)}}>
                                            Delete
                                      </Button>
                                  </div>
                                </td>
                            </tr>
                        ))}
                      </tbody>
					  <thead>
                        <tr>
                          <th className="th-shinobi-container">
                              <div>
                                Excel
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                PDF
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                CSV
                              </div>
                          </th>
                          <th className="th-shinobi-container" colSpan="3">
                              <div>
                                Add new student
                              </div>
                          </th>
                        </tr>
                      </thead>
						<tbody>
						   <tr>
							  <td className="td-shinobi-container" >
                                  <div>
                                      <Button 
                                              bsStyle="success" 
                                              bsSize="large"       
                                              disabled={!this.props.senseis}
                                              onClick={this.generateStudentsExcel}>
                                          Excel
                                      </Button>
                                  </div>
                              </td>
							  <td className="td-shinobi-container">
                                  <div>
                                    <Button 
                                          bsStyle="danger" 
                                          bsSize="large" 
                                          disabled={!this.props.senseis}
                                          onClick={this.generateStudentsPdf}>
                                        PDF
                                    </Button>
                                  </div>
                              </td>
							  <td className="td-shinobi-container" >
                                  <div>
                                    <Button 
                                          bsStyle="warning" 
                                          bsSize="large" 
                                          disabled={!this.props.senseis}
                                          onClick={this.generateStudentsCsv}>
                                        CSV
                                    </Button>
                                  </div>
                              </td>
							  <td className="td-shinobi-container" colSpan="3">
								  <div>
                                    <Button 
                                          bsStyle="success" 
                                          bsSize="large" 
                                          disabled={!this.props.user.isAdmin}
                                          onClick={this.handleAddStudentShow}>
                                        Add new
                                    </Button>
                                 </div>
							 </td>
						  </tr>
						</tbody>
                    </Table>
                     <Modal show={this.state.showAddStudent} onHide={this.handleAddStudentClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Students
                        </Modal.Title>
                      </Modal.Header>
                         <Modal.Body>
                            <p>
                              Fill the fields before adding
                            </p>
                            <DropdownButton title="Sensei" bsStyle="default" id="2" bsSize="large">
                                {shinobies.map((sensei, index) => (
                                    <MenuItem eventKey={sensei.name} key={index} onSelect={this.onSenseiSelect}>
                                        {sensei.name}
                                    </MenuItem>
                                ))}
                            </DropdownButton>
							<FormControl
                                    bsSize="large" 
                                    type = "text"
                                    placeholder="Enter Name"
                                    value = {this.state.studentName}
                                    onChange={this.onStudentNameInput}>
                            </FormControl>
							<FormControl
                                    bsSize="large" 
                                    type="number"
                                    placeholder="Enter Age"
                                    value = {this.state.studentAge}
                                    onChange={this.onStudentAgeInput}>
                            </FormControl>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button 
                                    bsStyle="success" 
                                    onClick={this.addNewStudent}>
                                Done
                            </Button>
                          </Modal.Footer>
                    </Modal>
					
					<Modal show={this.state.showEditStudent} onHide={this.handleEditStudentClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Students
                        </Modal.Title>
                      </Modal.Header>
                         <Modal.Body>
                            <p>
                              Fill the fields before adding
                            </p>
							<FormControl
                                    bsSize="large" 
                                    type = "text"
                                    placeholder="Enter Name"
                                    value = {this.state.studentName}
                                    onChange={this.onStudentNameInput}>
                            </FormControl>
							<FormControl
                                    bsSize="large" 
                                    type="number"
                                    placeholder="Enter Age"
                                    value = {this.state.studentAge}
                                    onChange={this.onStudentAgeInput}>
                            </FormControl>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button 
                                    bsStyle="success" 
                                    onClick={this.editStudent}>
                                Done
                            </Button>
                          </Modal.Footer>
                    </Modal>
                                        
                    <Table className="table-shinobi-container" responsive>
                      <thead>
						<tr>
                          <th className="th-shinobi-container table-titile" colSpan="6">
                              <div>Senseis</div>
                          </th>
                        </tr>
                        <tr>
                          <th className="th-shinobi-container">
                              <div>
                                Name
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Missions completed
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Students
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Edit
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Delete
                              </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {shinobies.map((shinobi, index) => (
                            <tr key={index}>
                              <td className="td-shinobi-container">
                                  <div>
                                    {shinobi.name}
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                    {shinobi.missionsCompleted}
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                    {shinobi.student}
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                      <Button 
                                          bsStyle="info" 
                                          bsSize="large" 
                                          disabled={!this.props.user.isAdmin}
                                          onClick={() => {this.handleEditSenseiShow(shinobi)}}>
                                            Edit
                                      </Button>
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                      <Button 
                                          bsStyle="danger" 
                                          bsSize="large" 
                                          disabled={!this.props.user.isAdmin}
                                          onClick={() => {this.deleteSensei(shinobi)}}>
                                            Delete
                                      </Button>
                                  </div>
                                </td>
                            </tr>
                        ))}
                      </tbody>
					  <thead>
                        <tr>
                          <th className="th-shinobi-container">
                              <div>
                                Excel
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                PDF
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                CSV
                              </div>
                          </th>
                          <th className="th-shinobi-container" colSpan="3">
                              <div>
                                Add new shinobi
                              </div>
                          </th>
                        </tr>
                      </thead>
						<tbody>
						   <tr>
							  <td className="td-shinobi-container" >
                                  <div>
                                      <Button 
                                              bsStyle="success" 
                                              bsSize="large"       
                                              disabled={!this.props.students} 
                                              onClick={this.generateSenseisExcel}>
                                          Excel
                                      </Button>
                                  </div>
                              </td>
							  <td className="td-shinobi-container">
                                  <div>
                                    <Button 
                                          bsStyle="danger" 
                                          bsSize="large" 
                                          disabled={!this.props.students} 
                                          onClick={this.generateSenseisPdf}>
                                        PDF
                                    </Button>
                                  </div>
                              </td>
							  <td className="td-shinobi-container" >
                                  <div>
                                    <Button 
                                          bsStyle="warning" 
                                          bsSize="large" 
                                          disabled={!this.props.students}
                                          onClick={this.generateSenseisCsv}>
                                        CSV
                                    </Button>
                                  </div>
                              </td>
							  <td className="td-shinobi-container" colSpan="3">
								  <div>
                                    <Button 
                                          bsStyle="success" 
                                          bsSize="large" 
                                          onClick={this.handleAddSenseiShow} 
                                          disabled={!this.props.user.isAdmin}>
                                        Add new
                                    </Button>
                                 </div>
							 </td>
						  </tr>
						</tbody>
                    </Table>
					
					<Modal show={this.state.showAddSensei} onHide={this.handleAddSenseiClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Students
                        </Modal.Title>
                      </Modal.Header>
                         <Modal.Body>
                            <p>
                              Fill the fields before adding
                            </p>
                            <DropdownButton title="Student" bsStyle="default" id="2" bsSize="large">
                                {students.map((student, index) => (
                                    <MenuItem eventKey={student.name} key={index} onSelect={this.onStudentSelect}>
                                        {student.name}
                                    </MenuItem>
                                ))}
                            </DropdownButton>
							<FormControl
                                    bsSize="large" 
                                    type = "text"
                                    placeholder="Enter Name"
                                    value = {this.state.senseiName}
                                    onChange={this.onSenseiNameInput}>
                            </FormControl>
							<FormControl
                                    bsSize="large" 
                                    type="number"
                                    placeholder="Enter Missions count"
                                    value = {this.state.senseiMissions}
                                    onChange={this.onSenseiMissionsInput}>
                            </FormControl>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button 
                                    bsStyle="success" 
                                    onClick={this.addNewSensei}>
                                Done
                            </Button>
                          </Modal.Footer>
                    </Modal>
					
					<Modal show={this.state.showEditSensei} onHide={this.handleEditSenseiClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Students
                        </Modal.Title>
                      </Modal.Header>
                         <Modal.Body>
                            <p>
                              Fill the fields before adding
                            </p>
							<FormControl
                                    bsSize="large" 
                                    type = "text"
                                    placeholder="Enter Name"
                                    value = {this.state.senseiName}
                                    onChange={this.onSenseiNameInput}>
                            </FormControl>
							<FormControl
                                    bsSize="large" 
                                    type="number"
                                    placeholder="Enter Missions"
                                    value = {this.state.senseiMissions}
                                    onChange={this.onSenseiMissionsInput}>
                            </FormControl>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button 
                                    bsStyle="success" 
                                    onClick={this.editSensei}>
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

const Shinobies = connect(mapStateToProps, mapDispatchToProps)(ShinobiesView);
export default Shinobies;
