/**
*
* Upcoming
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import PageHeader from '../PageHeader';

import styles from './styles.css';

function Upcoming({breadcrumbs, navigateTo}) {
  return (
    <div className={styles.upcoming}>
      <PageHeader breadcrumbs={breadcrumbs} navigateTo={navigateTo} loading={false}/>
      <div className={`mt-s`}>
        <FormattedMessage {...messages.header} />
      </div>
    </div>
  );
}

export default Upcoming;
