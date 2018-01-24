/*
 *
 * UpcomingContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Upcoming from '../../components/Upcoming';

export class UpcomingContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  name = 'Apps';
  sectionName = function () {
    if(location.pathname == '/apps/upcoming'){ this.name = 'Apps'};
    if(location.pathname == '/policies/upcoming'){ this.name = 'Policies'};
    if(location.pathname == '/logs/upcoming'){ this.name = 'Logs'};
    if(location.pathname == '/help/upcoming'){ this.name = 'Help'};
  }

  componentWillReceiveProps(nextProps) {
    this.sectionName();
    this.breadcrumbs = [{url:'/', name:'Home'}, {url:'', name: this.name}];
  }

  breadcrumbs = [{url:'/', name:'Home'}, {url:'', name: this.name}];
  
  navigateTo = function () {
    
  }

  render() {
    return <Upcoming breadcrumbs={this.breadcrumbs} navigateTo={this.navigateTo} />;
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(UpcomingContainer);
