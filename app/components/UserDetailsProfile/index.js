/**
*
* UserDetailsProfile
*
*/

import React from 'react';
import DetailsSection from '../DetailsSection';
import InputText from '../InputText';
import InputDate from '../InputDate';
import TextArea from '../TextArea';
import Button from '../Button';
import ProfilePictureSection from '../ProfilePictureSection';

import styles from './styles.css';

function UserDetailsProfile({ details, inputChange, handleRequestHide, handleCrop, handleFileChange }) {
  
  function boom(){}
  return (
    <DetailsSection uid='profile' title='Profile' update={details}>
      <div>
        <div className="row">
          <div className="col-md-12" style={{textAlign: 'center'}}>
            <ProfilePictureSection details={details} handleFileChange={handleFileChange} handleCrop={handleCrop} handleRequestHide={handleRequestHide}/>
          </div>
        </div>
        <div className="row mb-s mt-m">
          <InputDate
            label='Birthday'
            value={details.birthday}
            name='birthday'
            onChange={inputChange}
            size='4'
          />
          <InputText 
            label='Phone'
            value={details.phone}
            name='phone'
            onChange={inputChange}
            placeholder='Phone'
            size='4'
            number={true}
          />
          <InputText 
            label='Location'
            value={details.location}
            name='location'
            onChange={inputChange}
            placeholder='Location'
            size='4'
          />
        </div>
        <div className="row">
          <TextArea
            label='About Me'
            value={details.aboutMe}
            name='aboutMe'
            onChange={inputChange}
            size='8'
            maxlength='200'
            rows='5'
          />
          <div className="col-md-2 col-md-offset-2">
            <Button
              label='Logout all sessions'
              color='default'
              onClick={boom}
              className={styles.logoutSessionButton}
              disabled
            />
          </div>
        </div>
      </div>
    </DetailsSection>
  );
}

export default UserDetailsProfile;
