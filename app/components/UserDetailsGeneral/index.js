/**
*
* UserDetailsGeneral
*
*/

import React from 'react';
import DetailsSection from '../DetailsSection';
import InputText from '../InputText';
import InputPassword from '../InputPassword';
import Button from '../Button';
import YesNo from '../YesNo';
import { EMAIL_RGX } from '../../_shared/constants';

import styles from './styles.css';

function UserDetailsGeneral({ details, inputChange, showPassword, changePassword }) {
  // const emailRegex = new RegExp("^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.[A-z]{2,12}|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$");
  const emailRegex = new RegExp(EMAIL_RGX);

  let passwordSection = details.changingPassword === true ?
    (
      <div>
        <InputPassword
          label='Password'
          name='pswd1'
          value={details.pswd1}
          onChange={inputChange}
          placeholder=''
          errorMessage={details.errors.pswd1}
          size='4'
        />
        <InputPassword
          label='Retype Password'
          name='pswd2'
          value={details.pswd2}
          onChange={inputChange}
          placeholder=''
          errorMessage={details.errors.pswd2}
          size='4'
        />
        {details.id &&
          <div className="col-md-2">
            <Button
              label='Update Password'
              color='primary'
              onClick={changePassword}
              className={styles.updatePassword}
              disabled={details.pswd2.length === 0 || details.errors.pswd1 || details.errors.pswd2}
            />
          </div>}
      </div>
    ) : (
      <div className="col-md-4">
        <Button
          label='Change Password'
          color='primary'
          onClick={showPassword}
        />
      </div>
    );

  return (
    <DetailsSection uid='general' title='General' update={details} footer showUpdatedAndCreated>
      <div>
        <div className="row mb-s mt-m">
          <InputText
            label='First Name'
            value={details.firstName}
            name='firstName'
            onChange={inputChange}
            placeholder='First Name'
            errorMessage={details.errors.firstName}
            size='4'
          />
          <InputText 
            label='Last Name'
            value={details.lastName}
            name='lastName'
            onChange={inputChange}
            placeholder='Last Name'
            errorMessage={details.errors.lastName}
            size='4'
          />
          <InputText 
            label='Email'
            value={details.email}
            name='email'
            onChange={inputChange}
            placeholder='Email'
            errorMessage={details.errors.email}
            size='4'
          />
        </div>

        <div className="row mb-s">
          {passwordSection}
        </div>

        <div className="row mb-s">
          <div className="col-md-4 mt-s">
            <YesNo
              label='Is Active'
              name='isActive'
              value={details.isActive}
              onChange={inputChange}
              uniqueId='userIsActive'
            />
          </div>
        </div>
      </div>
    </DetailsSection>
  );
}

export default UserDetailsGeneral;
