/**
*
* DetailsSection
*
*/

import React from 'react';
import CreatedUpdatedFooter from '../CreatedUpdatedFooter';
import DateFormat from 'dateformat';
import { CREATED_UPDATED_TIME } from '../../_shared/constants';

import styles from './styles.css';

function DetailsSection({ uid, title, children, footer, update, showUpdatedAndCreated }) {

  const id = uid || 'default';

  return (
    <div className={styles.detailsSection} id={id}>
      <section>
        { title && <h2>{title}</h2> }
        
        {children}

        { footer &&
          <div className={styles.footer}>
            <hr/>
            <div className='row'>
              <div className='col-md-12'>
                { !update.lastUpdateDate || showUpdatedAndCreated &&
                  <span>
                    <span>Created on: {DateFormat(update.createDate, CREATED_UPDATED_TIME)} by <b>{update.createBy}</b></span>
                    <br/>
                  </span>}
                  
                { update.lastUpdateDate &&
                <span>Updated on: {DateFormat(update.lastUpdateDate, CREATED_UPDATED_TIME)} by <b>{update.lastUpdateBy}</b></span>}
              </div>
            </div>
          </div>
        }
      </section>
    </div>
  );
}

DetailsSection.propTypes = {
  uid: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  children: React.PropTypes.element.isRequired,
};

export default DetailsSection;
