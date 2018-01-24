/**
*
* LinkList
*
*/

import React from 'react';
import Link from '../Link';

import styles from './styles.css';

function LinkList({ path, links, navigateTo }) {
  let selected = menu => {
    return menu.slice(1) === path.slice(1,menu.length) && menu.slice(1)
  };

  const linkNodes = links.map((link, i) => {
    let sublinks = '';

    // add submenu
    if (link.sublinks && link.sublinks.length > 0) {
      let sublinkNodes = link.sublinks.map((sublink, k) => <li key={k} > <Link link={sublink} navigateTo={navigateTo} /> </li>);
      sublinks = <ul> {sublinkNodes} </ul>;
    }

    return <li key={i} className={`${selected(link.url) ? styles.active : ''}`}> <Link link={link} navigateTo={navigateTo} />{sublinks}</li>;
  });

  return (
    <div className={styles.linkList}>
      <ul className='linkListUl'>
        {linkNodes}
      </ul>
    </div>
  );
}

LinkList.propTypes = {
  navigateTo: React.PropTypes.func.isRequired,
  links: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
  })),
  path: React.PropTypes.string.isRequired,
};

export default LinkList;
