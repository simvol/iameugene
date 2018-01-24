/**
*
* Header
*
*/

import React from 'react';
import ConfirmationModal from './../ConfirmationModal'

import styles from './styles.css';

function Header({currentUser, onClick, showModal, close, logout}) {
  const classes = `${styles.header} header col-md-12`;
  return (
    <div className={classes} style={{ borderBottom: '1px solid #ccc', height: '55px' }}>

      <div className={`${styles.navbarSignOut} clickable unselectable`}>
        <a onClick={onClick}>Sign out</a>
      </div>

      <div className={`${styles.navbarHeaderDivider}`}></div>

      <div className={`${styles.userSwitchGroup}`} style={{ marginTop: '19px', marginRight: '15px' }}>
        <div>
          Logged in as <b>{currentUser.name || 'Unknown User'}</b>.
        </div>
      </div>

      <ConfirmationModal header={`Sign out?`} body={`Are you sure you want to logout?`} confirm={{text: 'Logout', color:'success', callBack:logout, isDisabled:false}} cancel={{text: 'Cancel', color:'primary', callBack:close, isDisabled: false}} showModal={showModal}/>
    </div>
  );
}

export default Header;
