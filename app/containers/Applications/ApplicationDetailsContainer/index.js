/*
 *
 * ApplicationDetailsContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectApplicationDetailsContainer from './selectors';
import ApplicationDetailsPage from '../../../components/ApplicationDetailsPage';
import * as ApplicationDetailsActions from './actions';
import { bindActionCreators } from 'redux';
import { push, replace } from 'react-router-redux';
import { EMAIL_RGX, URL_RGX, APP_ID_RGX } from '../../../_shared/constants';
import { showLoading } from '../../../_shared/actions';
import toastr from 'toastr';

export class ApplicationDetailsContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    actions: React.PropTypes.object.isRequired,    
  };

  constructor(props) {
    super(props);
    
    //Application Details
    this.state = {
        id: null,
        displayName: '',
        siteUrl: '',
        callbackUrl: '',
        clientId: '',
        domains: '',
        emailContact: '',
        logoUrl: '',
        userEditCallbackUrl: '',
        isActive: true,

        // createBy: '',
        // createDate: '',
        // lastUpdateBy: '',
        // lastUpdateDate: '',
        // secretKey: '',
        inputsAreValid: false,
        errors: { }
    };

    this.requiredFields = ['displayName', 'emailContact', 'siteUrl', 'callbackUrl', 'logoUrl', 'userEditCallbackUrl', 'clientId'];
    this.minInputLength = 3;
    this.emailRegex = new RegExp(EMAIL_RGX);
    this.urlRegex = new RegExp(URL_RGX);
    this.appIdRegex = new RegExp(APP_ID_RGX);

    this.navigateTo = this.navigateTo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event, error) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // console.log('> ', name + ': ' + value);
    
    this.setState({
      [name]: value
    });

    this.validate(name, value);
    this.setInputsAreValid();
  }

  validate(name, value){
    let error = '';
    switch (name) {
      case 'emailContact':
        error = !this.emailRegex.test(value) ? 'Please type a valid email' : null;
        break;
      case 'siteUrl':
      case 'callbackUrl':
      case 'logoUrl':
      case 'userEditCallbackUrl':
        error = !this.urlRegex.test(value) ? 'Please type a valid url' : null;
        break;
      case 'clientId':
        error = !this.appIdRegex.test(value) ? 'Id should consist of letters and digits only' : null;
      break;
    }

    this.setState({
      errors: {...this.state.errors, [name]: error}
    })
  }

  // Setting inputsAreValid to true/false
  setInputsAreValid() {
    this.setState({inputsAreValid: true});
    Object.entries(this.state.errors).forEach(([key, value]) => {
      if (value === true) {
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
    // console.log('nextProps: ', nextProps);
    if (nextProps) {
      this.setState(nextProps.applicationDetails);
    }

    
  }

  handleSubmit() {
    
    let payload = Object.assign({}, this.state);
    delete payload.errors;
    delete payload.inputsAreValid;

    if (!this.validateRequiredFields()) return;

    if (payload.id) {
      this.props.actions.saveApplication(payload);
    } else {
      delete payload.id;
      // console.log('Submit: ', payload);
      this.props.actions.saveApplication(payload);
    }
  }

  componentWillMount(){
    if (this.props.routeParams.id !== 'new'){
      this.props.actions.showLoading(true);      
      this.props.actions.requestApplication(this.props.routeParams.id);
    }

    toastr.info("Sorry, but we are not saving at the moment :(", "Oops.");
  }

  navigateTo = (url) => {
    this.props.actions.push(url);
  };

  breadcrumbs = [{url:'/', name:'Home'}, {url:'/applications', name:'Applications List'}, {name:'Applications Details'}];
  
  render() {
    return (
      <ApplicationDetailsPage
        {...this.props}
        form={this.state}
        breadcrumbs={this.breadcrumbs}
        navigateTo={this.navigateTo}
        handleInputChange={this.handleInputChange}
        handleSave={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = selectApplicationDetailsContainer();

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, ApplicationDetailsActions, {push, replace, showLoading}), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetailsContainer);
