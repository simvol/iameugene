/*
 *
 * LoginContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectLoginContainer from './selectors';
import * as appInfoAction from './actions';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import Login from "../../components/Login"

export class LoginContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  error = false;
  
  constructor(props){
    super(props);
    this.state = {
      username: localStorage.getItem('userEmail') ? JSON.parse(localStorage.getItem('userEmail')).userEmail : '', password: '', rememberMe: localStorage.getItem('userEmail') ? true : false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleSubmit(event){
    event.preventDefault(); 
    this.props.actions.loginRequest(this.state);
  }

  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  componentWillMount() {
    this.props.actions.requestAppInfo();
    localStorage.getItem('userEmail') ? this.props.actions.requestUserImage(this.state.username) : '';
    this.userImageURL = this.props.userImgURL;
  }

  componentWillReceiveProps(props){
    this.error = props.isFailed;
    this.userImageURL = props.userImgURL;
  }

  render() {
    return (
      <Login appInfo={this.props.appInfo} handleSubmit={this.handleSubmit} handleChange={this.handleChange} username={this.state.username} password={this.state.password} rememberMe={this.state.rememberMe} error={this.error} userImageURL={this.userImageURL} />
    );
  }
}

const mapStateToProps = selectLoginContainer();

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({},appInfoAction, {push:push}), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
