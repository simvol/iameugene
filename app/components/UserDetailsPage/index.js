/**
*
* UserDetailsPage
*
*/

import React from 'react';
import PageHeader from '../PageHeader';
import UserDetailsGeneral from '../UserDetailsGeneral';
import UserDetailsApplications from '../UserDetailsApplications';
import UserDetailsProfile from '../UserDetailsProfile';
import RightMenu from '../RightMenu';
import Sticky from 'react-stickynode';

import styles from './styles.css';

function UserDetailsPage({
    ajaxRequestsInProgress,
    details,
    applications,
    breadcrumbs,
    navigateTo,
    handleInputChange,
    changePassword,
    showPassword,
    addApplication,
    removeApplication,
    handleFileChange,
    handleCrop,
    handleRequestHide,
    handleSaveButton,
    handleBackButton,
    changeApplicationStatus,
}) {
  const classes = `${styles.userDetailsPage}`;
  const loading = ajaxRequestsInProgress > 0;
  const sections = [
    {
      label: `${details.firstName} ${details.lastName}`,
    },
    {
      label: 'General',
      id: 'general',
      icon: 'fa fa-cog fa-fw',
    },
    {
      label: 'Applications',
      id: 'applications',
      icon: 'fa fa-code-fork fa-fw',
    },
    {
      label: 'Profile',
      id: 'profile',
      icon: 'fa fa-sliders fa-flip-horizontal fa-fw',
    }
  ];

  return (
    <div className={classes}>
      <div className="row">
        <div className="col-xs-12">
          <PageHeader loading={ajaxRequestsInProgress > 0} breadcrumbs={breadcrumbs} navigateTo={navigateTo}/>
        </div>
      </div>
      <div className="row">  
        <div className="col-xs-9">
          <h1 className={styles.leftline}>{!loading && details.firstName + ' ' + details.lastName} {loading && 'Loading...'}</h1>
          
          { !loading && details &&
            <div>
              <UserDetailsGeneral details={details} changePassword={changePassword} showPassword={showPassword} inputChange={handleInputChange}/>
              <UserDetailsApplications details={details} applications={applications} inputChange={handleInputChange} addApplication={addApplication} removeApplication={removeApplication} changeApplicationStatus={changeApplicationStatus}/>
              <UserDetailsProfile details={details} inputChange={handleInputChange} handleFileChange={handleFileChange} handleCrop={handleCrop} handleRequestHide={handleRequestHide}/>
            </div>
          }
        </div>
        <div className="col-xs-3" id='right-column'>
          <Sticky top='#right-column'>
            <RightMenu sections={sections} onSave={handleSaveButton} onBack={handleBackButton} saveDisabled={false}/>
          </Sticky>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsPage;
