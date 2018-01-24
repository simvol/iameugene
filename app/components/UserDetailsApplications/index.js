/**
*
* UserDetailsApplications
*
*/

import React from 'react';
import DetailsSection from '../DetailsSection';
import Grid from '../Grid';
import SelectAdd from '../SelectAdd';


import styles from './styles.css';

function UserDetailsApplications({details, applications, inputChange, addApplication, removeApplication, changeApplicationStatus}) {
  
  let data, options;

  let columns = [
    {dataField: 'displayName', isKey: true, dataSort: true, displayName: 'Application Name', width: '75%'},
    {dataField: 'userApplicationIsActive', dataFormat: 'active', displayName: 'Enable Access'},
    {dataField: 'buttons', dataFormat: 'buttons', displayName: 'Actions'},
  ];

  if (details && details.applications) {
    data = details.applications.map( application => {
      return {
        ...application,
        id: application.applicationId,
        buttons: [
          {
            tooltip: 'Remove',
            icon: 'remove',
            color: 'danger',
            onClick: removeApplication,
          },          
        ]
      }
    });
  }
  
  if (applications && applications.length > 0){
    options = applications
      .filter( app => {
        return !details.applications.map(da => da.applicationId).find(id => id === app.id)
      })
      .map(app => {
        return {
          value: app.id,
          label: app.name
        }
      });
  }

  return (
    <DetailsSection uid='applications' title='User Applications' update={details}>
      <div className="row mb-s mt-m">
        <div className="col-md-7 mb-m">
          <SelectAdd options={options} selected={details.selectedApplication} onChange={inputChange} onAdd={addApplication}/>
        </div>
        <div className="col-md-12">
          <Grid data={data} columns={columns} changeApplicationStatus={changeApplicationStatus} lite />
        </div>
      </div>
    </DetailsSection>
  );
}

UserDetailsApplications.propTypes = {
  details: React.PropTypes.object.isRequired,
  applications: React.PropTypes.array,
};

export default UserDetailsApplications;
