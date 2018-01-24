/*
 *
 * NavigationContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectNavigationContainer from './selectors';
import * as sideMenuActions from './actions';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import Navigation from '../../components/Navigation';

export class NavigationContainer extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    this.expand = this.expand.bind(this);

    this.menu = [
      {
        name: 'Dashboards',
        url: '/',
        icon: 'home',
      },
      {
        name: 'Apps / APIs',
        url: '/apps/upcoming',
        icon: 'exchange',
      },
      {
        name: 'Applications',
        url: '/applications',
        icon: 'sitemap',
      },
      {
        name: 'Users',
        url: '/users',
        icon: 'users',
      },
      {
        name: 'Policies',
        url: '/policies/upcoming',
        icon: 'book',
      },
      {
        name: 'Logs',
        url: '/logs/upcoming',
        icon: 'bar-chart',
      },
      {
        name: 'Help',
        url: '/help/upcoming',
        icon: 'question-circle',
        sublinks: [
          {
            name: 'Getting Started',
            url: '/help/getting-started',
          },
          {
            name: 'Documentation',
            url: '/help/documentation',
          },
        ],
      },
    ];
  }

  navigateTo = (menuItem) => {
    this.props.dispatch(push(menuItem));
  };

  expand = () => {
    this.props.actions.openSideMenu(!this.props.expanded);
  }

  render() {
    return (
      <Navigation {...this.props} expand={this.expand} menu={this.menu} navigateTo={this.navigateTo} />
    );
  }
}

const mapStateToProps = selectNavigationContainer();

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({},sideMenuActions, {push}), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);
