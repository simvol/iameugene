/*
 *
 * UserDetailsContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectUserDetailsContainer from './selectors'; 
import * as UserDetailsActions from './actions';
import { push, goBack } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import UserDetailsPage from '../../../components/UserDetailsPage';
import { getWithStatuses } from '../../../_shared/services/statusDeterminator';
import { PSWD_RGX, MIN_PASSWORD_LENGTH, EMAIL_RGX } from '../../../_shared/constants';
import { showLoading } from '../../../_shared/actions';
import toastr from 'toastr';

export class UserDetailsContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    actions: React.PropTypes.object.isRequired,    
  };

  constructor(props) {
    super(props);
    
    this.pswdRgx = new RegExp(PSWD_RGX);
    this.emailRegex = new RegExp(EMAIL_RGX);    

    //User Details
    this.state = {
      id: null,
      firstName:'New User',
      lastName:'',
      email:'',
      isActive:true,
      birthday:null,
      phone:'',
      location:'',
      aboutMe:'',
      profilePictureUrl:'',
      applications:[],
      originalApplications:[],
      selectedApplication:null,
      selectedApplicationDetails:null,

      // createDate:'',
      // createBy:'',
      // lastUpdateDate:'',
      // lastUpdateBy:'',
      pswd1:'',
      pswd2: '',
      changingPassword: false,
      inputsAreValid: false,
      errors: { },
      img: null,
      cropperOpen: false
    };

    this.requiredFields = ['firstName', 'lastName', 'email'];

    this.sections = []; //section ids and position to update right menu

    this.baseState = Object.assign({},this.state);

    this.navigateTo = this.navigateTo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.changePassword = this.changePassword.bind(this);
    this.showPassword = this.showPassword.bind(this);

    this.addApplication = this.addApplication.bind(this);
    this.removeApplication = this.removeApplication.bind(this);

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleCrop = this.handleCrop.bind(this);
    this.handleRequestHide = this.handleRequestHide.bind(this);
    this.changeApplicationStatus = this.changeApplicationStatus.bind(this);
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // console.log('event ', event);
    console.log('> ', name + ': ' + value);
    
    this.setState({
      [name]: value
    });

    this.validate(name, value);
    
  }

  // Setting error true (example: state.errors.emailContact = true)
  validate(name, value){
    let error = '';
    switch (name) {
      case 'firstName':
        error = !value || value.length === 0 ? 'Please type your first name' : '';
        break;
      case 'lastName':
        error = !value || value.length === 0 ? 'Please type your last name' : '';
        break;
      case 'email':
        error = !this.emailRegex.test(value) ? 'Please type your email' : '';
        break;
      case 'pswd1':
        // error = !this.pswdRgx.test(value); //couldn't find good regexp and old iam doesnt have any validation...
        error = !value || value.length < MIN_PASSWORD_LENGTH ? `Password should be minimum ${MIN_PASSWORD_LENGTH} characters` : '' ;
        break;
      case 'pswd2':
        error = this.state.pswd1 != value ? `Passwords don't match` : '';
        break;
    }
    // console.log(`pswd1 ${this.state.pswd1} equal=${error} to pswd2 ${value}`)
    
    this.setState({
      errors: {...this.state.errors, [name]: error}
    }, () => this.setInputsAreValid());
  }  

  // Setting inputsAreValid to true/false
  setInputsAreValid() {
    this.setState({inputsAreValid: true});
    Object.entries(this.state.errors).forEach(([key, value]) => {
      if (value && value.length > 0) {
        this.setState({inputsAreValid: false});  
      }
    });
  }

  //Set errors and return false if there are some
  validateRequiredFields() {

    let errors = [];
    
    this.requiredFields.forEach(field => {
      if (this.state[field].length === 0) {
        errors.push({[field]:'Field is required'});
      }
    });
    
    this.setState({
      errors: Object.assign({},...this.state.errors, ...errors)
    });

    return errors.length === 0;
  }

  componentWillReceiveProps(nextProps){
    if (nextProps) {
      this.setState(nextProps.userDetails);
    }
    
    if (this.props.params.id !== 'new' && this.state.originalApplications && this.state.originalApplications.length === 0) {
      this.setState({originalApplications: nextProps.userDetails.applications});
    }

    if (nextProps && nextProps.applicationDetails) {
      this.setState({selectedApplicationDetails: nextProps.applicationDetails})
    }
  }

  handleSubmit() {

    let payload = this.mapProperties(this.state);
    
    if (!this.validateRequiredFields()) return;

    if (payload.id) {
      this.props.actions.requestSaveUser(payload);
    } else {
      delete payload.id;
      payload.password = this.state.pswd1;
      this.props.actions.requestSaveUser(payload);
    }

  }

  mapProperties(data){
    
    let payload = Object.assign({}, this.state);
    
    payload.applications = getWithStatuses(payload.applications, this.state.originalApplications, 'applicationId');

    this.setState({originalApplications: payload.applications});

    payload.applications = payload.applications.map(item => {
      return {
        id: item.applicationId,
        state: item.state,
        isActive: item.userApplicationIsActive,
      }
    });

    //removing extra properties
    delete payload.errors;
    delete payload.inputsAreValid;
    delete payload.pswd1;
    delete payload.pswd2;
    delete payload.changingPassword;
    delete payload.img;
    delete payload.cropperOpen;
    delete payload.activeSection;
    delete payload.originalApplications;

    return payload ;
  }

  componentWillMount(){
    const { id } = this.props.params;
    if (id !== 'new'){
      this.props.actions.showLoading(true);
      this.props.actions.requestUser(id);
    } else {
      this.props.actions.requestUser(); // to request dropdown and other info that is fetched along with user details
      this.setState({changingPassword: true});
      this.requiredFields.push('pswd1', 'pswd2');
    }
    toastr.info("Sorry, but we are not saving at the moment :(", "Oops.");
  }

  navigateTo = (url) => {
    this.props.actions.push(url);
  };

  changePassword () {
    this.props.actions.requestChangePassword({
      id: this.state.id,
      pswd: this.state.pswd1
    });

    this.setState({pswd1: '', pswd2: '', changingPassword: false});
  }

  showPassword () {
    this.setState({changingPassword: true});
  }

  addApplication () {
    this.props.actions.addApplication(this.state.selectedApplication.value);
    this.setState({selectedApplication: null});
  }

  removeApplication(id){
    this.props.actions.removeApplication(id);
  }

  handleFileChange (dataURI) {
    this.setState({
      img: dataURI,
      cropperOpen: true
    });
  }

  handleCrop (dataURI) {
    this.setState({
      cropperOpen: false,
      img: null,
      profilePictureUrl: dataURI
    });

    this.props.actions.requestUploadPicture(this.state.id, dataURI);
  }

  handleRequestHide() {
    this.setState({
      cropperOpen: false
    });
  }

  changeApplicationStatus(application) {
  
    let applications = this.state.applications.slice();

    for (let i = 0; i < applications.length; i++){
      if (applications[i].applicationId === application.applicationId) {
        applications[i].userApplicationIsActive = !application.userApplicationIsActive;
      }
    }
    
    this.setState({applications})
  } 

  breadcrumbs = [{url:'/', name:'Home'}, {url:'/users', name:'Users List'}, {name:'Users Details'}];
  
  render() {
    return (
      <UserDetailsPage
        {...this.props}
        details={this.state}
        breadcrumbs={this.breadcrumbs}
        navigateTo={this.navigateTo}
        handleInputChange={this.handleInputChange}
        changePassword={this.changePassword}
        showPassword={this.showPassword}
        addApplication={this.addApplication}
        removeApplication={this.removeApplication}
        handleFileChange={this.handleFileChange}
        handleCrop={this.handleCrop}
        handleRequestHide={this.handleRequestHide}
        handleSaveButton={this.handleSubmit}
        handleBackButton={this.props.actions.goBack}
        changeApplicationStatus={this.changeApplicationStatus}
      />
    );
  }
}

const mapStateToProps = selectUserDetailsContainer();

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, UserDetailsActions, {push, goBack, showLoading}), dispatch),    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsContainer);
