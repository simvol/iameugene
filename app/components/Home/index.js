/**
*
* Home
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import PageHeader from '../PageHeader'

import styles from './styles.css';

function Home({breadcrumbs, navigateTo}) {
  return (
    <div className={styles.home}>
        <PageHeader loading={false} breadcrumbs={breadcrumbs} navigateTo={navigateTo} />
        <h4 style={{fontWeight: 100}}>
          <FormattedMessage {...messages.body} />
        </h4>
    </div>
  );
}

export default Home;
