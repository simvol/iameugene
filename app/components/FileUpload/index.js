/**
*
* FileUpload
*
*/

import React from 'react';


import styles from './styles.css';

function FileUpload({ id, label, handleFileChange }) {
  let inputElement;

  function handleFile(e) {
    var reader = new FileReader();
    var file = e.target.files[0];

    if (!file) return;

    reader.onload = function(img) {
      // ReactDom.findDOMNode(this.refs.in).value = '';
      // e.target.files[0] = null;
      inputElement.value = '';
      handleFileChange(img.target.result);
    }.bind(this);
    reader.readAsDataURL(file);
  }

  return (
    <div className={styles.fileUpload}>
      <label htmlFor={id} className="btn btn-primary button-mar center-block btn-upload"> {label} </label>
      <input ref={node => inputElement = node} id={id} type="file" accept="image/*" onChange={handleFile} />
    </div>
  );
}

export default FileUpload;
