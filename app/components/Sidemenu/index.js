/**
*
* Sidemenu
*
*/

import React from 'react';
import LinkList from '../LinkList';
import FontAwesome from 'react-fontawesome';
import LogoImage from '../LogoImage'

import styles from './styles.css';

function Sidemenu({ expand, expanded, location, links, navigateTo }) {
  const classes = `${styles.sidemenu} ${expanded === true ? 'expanded' : ''} sidemenu`;
  const logoUrl = expanded ?
    require("../../_shared/images/LogoWhite.png")
    :
    require("../../_shared/images/LogoWhiteSmall.png");
    
  return (
    <div className={classes}>
      <div className={styles.brand}>
        <div className={'text-center'}>
          <LogoImage height="35" url={logoUrl} ></LogoImage>
          <FontAwesome onClick={expand} onTouchEnd={expand} name="bars" className={`${styles.menuIcon} pull-right`} />
        </div>
      </div>
      <br />
      {/* <div className={styles.search}>Search for something...</div> */}
      <LinkList path={location} links={links} navigateTo={navigateTo} />
    </div>
  );
}

Sidemenu.propTypes = {
  expand: React.PropTypes.func.isRequired,
  expanded: React.PropTypes.bool.isRequired,
  navigateTo: React.PropTypes.func.isRequired,
  links: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
  })),
};

export default Sidemenu;
