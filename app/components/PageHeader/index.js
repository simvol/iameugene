/**
*
* PageHeader
*
*/

import React from 'react';
import FontAwesome from 'react-fontawesome';
import A from '../A';

import styles from './styles.css';

function PageHeader({ breadcrumbs, loading, navigateTo }) {
  const breadcrumbsElements = breadcrumbs.map((breadcrumb, i) => {    
    if (breadcrumb.url){
      return (
        <li key={i}>
            <A navigateTo={navigateTo} link={breadcrumb} />
        </li> 
      );
    } else {
      return (
        <li key={i}>
          <strong >{breadcrumb.name}</strong>
        </li>
      );
    }
  });

  return (
    <div className={`${styles.pageHeader} row wrapper breadcrumb-title-border white-bg page-heading`}>

      <div className="col-lg-12">
        <h2 style={{ marginTop: '14px !important' }}>{ breadcrumbs[breadcrumbs.length - 1].name } { loading && <FontAwesome name='spinner' spin/> } </h2>
        <ol className="breadcrumb">
          {breadcrumbsElements}
        </ol>
      </div>

    </div>
  );
}

PageHeader.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  breadcrumbs: React.PropTypes.array.isRequired,
};

export default PageHeader;
