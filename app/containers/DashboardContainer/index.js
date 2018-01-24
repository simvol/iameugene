/*
 *
 * DashboardContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectDashboardContainer from './selectors';
import Home from '../../components/Home';

export class DashboardContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function



  navigateTo = (menuItem) => {
    this.props.actions.push(menuItem);
  };

  breadcrumbs = [{url:'', name:'Home'}];

  render() {
    return <Home breadcrumbs={this.breadcrumbs} navigateTo={this.navigateTo}/>;
  }
}

const mapStateToProps = selectDashboardContainer();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
