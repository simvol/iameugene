/**
*
* ConfirmationModal
*
*/

import React from 'react';
import {Modal} from 'react-bootstrap';
import Button from './../Button'

import styles from './styles.css';

function ConfirmationModal({header, body, confirm, cancel, showModal}) {
  return (
    <div className={styles.confirmationModal}>
      <Modal show={showModal} onHide={cancel.callBack} >
        <Modal.Header closeButton className={styles.header}>
          <Modal.Title>
            {header}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <span className={styles.body}>{body}</span>            
        </Modal.Body>

        <Modal.Footer>
          <div className='row'>
            <div className={`${styles.cnl_btn} col-md-3 pull-right`}>
              <Button label={cancel.text} color={cancel.color} onClick={cancel.callBack} disabled={cancel.isDisabled} />
            </div>
            <div className={`${styles.cfm_btn} col-md-3 pull-right`}>
              <Button label={confirm.text} color={confirm.color} onClick={confirm.callBack} disabled={confirm.isDisabled} />
            </div>
           </div> 
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ConfirmationModal;
