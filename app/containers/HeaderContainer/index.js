/*
 *
 * HeaderContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectHeaderContainer from './selectors';
import Header from '../../components/Header';
import { bindActionCreators } from 'redux';
import * as headerActions from './actions';

import { eraseCookie, getCookie } from '../../_shared/services/cookie-provider';
// import styles from './styles.css';

export class HeaderContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
    this.state = {
      showModal: false
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount(){
    // this.props.actions.requestUser();
  }

  open(){
    this.setState({showModal: true});
  }

  close(){
    this.setState({showModal: false});
  }

  logout(){
    if(getCookie("tk")) eraseCookie('tk');
    window.location.href = '/signin';
  }

  render() {
    return (
      <Header {...this.props} onClick={this.open} showModal={this.state.showModal} close={this.close} logout={this.logout} />
    );
  }
}

const mapStateToProps = selectHeaderContainer();

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(headerActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
