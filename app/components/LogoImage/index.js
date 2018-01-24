/**
*
* LogoImage
*
*/

import React from 'react';

import styles from './styles.css';

function LogoImage(elem) {
  return (
    <img height={elem.height} className={elem.class} style={elem.style} src={elem.url} />
  );
}

export default LogoImage;
