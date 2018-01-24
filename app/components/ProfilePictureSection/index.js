/**
*
* ProfilePictureSection
*
*/

import React from 'react';
import AvatarCropper from 'react-avatar-cropper';
import FileUpload from '../FileUpload';


import styles from './styles.css';

function ProfilePictureSection({ details, handleFileChange, handleRequestHide, handleCrop }) {

  const { profilePictureUrl, img, cropperOpen } = details;

  const imgSrc = profilePictureUrl ? profilePictureUrl : require("../../_shared/images/avatar_2x.png");

  return (
    <div className={styles.profilePictureSection}>
      {cropperOpen &&
        <AvatarCropper
          onRequestHide={handleRequestHide}
          cropperOpen={cropperOpen}
          onCrop={handleCrop}
          image={img}
          width={400}
          height={400}
        />}
        <img style={{ borderRadius: '120px', minHeight: '190px'}} id="profileImg" className="img-thumbnail center-block" width="200" src={imgSrc} alt='profile picture'/>
      <br/>
      <FileUpload id='profilePictureUpload' label='Upload picture' handleFileChange={handleFileChange}/>
    </div>
  );
}

export default ProfilePictureSection;
