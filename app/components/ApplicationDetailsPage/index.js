/**
*
* ApplicationDetailsPage
*
*/

import React from 'react';
import PageHeader from '../PageHeader';
import DetailsSection from '../DetailsSection';
import InputText from '../InputText';
import Button from '../Button';
import YesNo from '../YesNo';

import styles from './styles.css';

function ApplicationDetailsPage({ ajaxRequestsInProgress, form, breadcrumbs, navigateTo, handleInputChange, handleSave, inputsAreValid }) {

  const classes = `${styles.applicationDetailsPage}`;
  const loading = ajaxRequestsInProgress > 0;
  
  return (
    <div className={classes}>
      <PageHeader loading={ajaxRequestsInProgress > 0} breadcrumbs={breadcrumbs} navigateTo={navigateTo}/>
      
      <h1 className={styles.leftline}>{!loading && form.displayName} {loading && 'Loading...'}</h1>
      
      { !loading &&
      <DetailsSection uid='general'>
        <div>
          <div className="row mb-s mt-m">
            <InputText 
              label='Display Name'
              value={form.displayName}
              name='displayName'
              onChange={handleInputChange}
              placeholder='Display Name'
              errorMessage={form.errors.displayName}
              size='6'
            />
            <InputText 
              label='Site URL'
              value={form.siteUrl}
              name='siteUrl'
              onChange={handleInputChange}
              placeholder='Site URL'
              errorMessage={form.errors.siteUrl}              
              size='6'
            />
          </div>

          <div className="row mb-s mt-m">
            <InputText 
              label='Login Callback URL'
              value={form.callbackUrl}
              name='callbackUrl'
              onChange={handleInputChange}
              placeholder='Login Callback URL'
              errorMessage={form.errors.callbackUrl}
              size='6'
            />
            <InputText 
              label='User Create URL'
              value={form.userEditCallbackUrl}
              name='userEditCallbackUrl'
              onChange={handleInputChange}
              placeholder='User Create URL'
              errorMessage={form.errors.userEditCallbackUrl}
              size='6'
            />
          </div>

          <div className="row mb-s mt-m">
            <InputText 
              label='Email Contact'
              value={form.emailContact}
              name='emailContact'
              onChange={handleInputChange}
              placeholder='Email Contact'
              errorMessage={form.errors.emailContact}
              size='6'
            />
            <InputText 
              label='Application Id (letters, numbers and hyphen allowed)'
              value={form.clientId}
              name='clientId'
              onChange={handleInputChange}
              placeholder='Application Id'
              errorMessage={form.errors.clientId}
              size='6'
            />
          </div>

          <div className="row mb-s mt-m">
            <InputText 
              label='Logo URL'
              value={form.logoUrl}
              name='logoUrl'
              onChange={handleInputChange}
              placeholder='Logo URL'
              errorMessage={form.errors.logoUrl}
              size='6'
            />
            <InputText 
              label='Domains'
              value={form.domains}
              name='domains'
              onChange={handleInputChange}
              placeholder='Domains'
              errorMessage={form.errors.domains}
              size='6'
            />
          </div>

          <div className="row mb-s mt-s">
            <div className="col-md-4 pt-m">
              <YesNo
                label="Is Active?"
                name="isActive"
                value={form.isActive}
                onChange={handleInputChange}
                uniqueId="isApplicationActive"
              />
            </div>
            <div className="col-md-2 pull-right">
              <Button
                label="Save"
                color="success"
                onClick={handleSave}
                disabled={!form.inputsAreValid}
              />
            </div>
          </div>
        </div>
      </DetailsSection>}
    </div>
  );
}

export default ApplicationDetailsPage;
