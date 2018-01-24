/*
 * MainPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import NavigationContainer from '../NavigationContainer';
import HeaderContainer from '../HeaderContainer';
import Loading from  '../../components/Loading';

import selectHomeContainer from './selector'

class MainPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.element,
  }
  
  render() {

    return (
      <div className="container-fluid">
        <div className="row">
          <NavigationContainer {...this.props} />
          <HeaderContainer {...this.props} />
          <Loading show={this.props.ajaxRequestsInProgress > 0 && this.props.showSpinner == true} />
          <div className={`main-content plr-30 ${this.props.expanded === true ? 'expanded' : ''}`}> {this.props.children} </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = selectHomeContainer();

export default connect(mapStateToProps)(MainPage);
