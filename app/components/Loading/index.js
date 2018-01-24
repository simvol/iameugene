/**
*
* Loading
*
*/

import React from 'react';

import styles from './styles.css';

function Loading({show}) {

  const error_styles = {
    display: show == false ? 'none' : 'block'
  }
  return (
    <div className={styles.loading} style={error_styles}>
      <i className={`${styles.loading_img} fa fa-cog fa-spin`}></i>
    </div>
  );
}

export default Loading;
