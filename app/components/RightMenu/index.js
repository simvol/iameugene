/**
*
* RightMenu
*
*/

import React from 'react';
import { animateScroll } from 'react-scroll';
import Button from '../Button';
import Scrollspy from 'react-scrollspy';

import styles from './styles.css';

function RightMenu({ sections, onSave, onBack, saveDisabled }) {
  const smoothlyScroll = (e) => {
    e.preventDefault();
    var offset = document.getElementById(e.currentTarget.hash.substr(1));
    animateScroll.scrollTo(offset.offsetTop + 180, {duration: 800});
  };
  const sectionIds = sections.map(s => s.id);

  return (
    <nav className={styles.rightMenu}>
      <div className={styles.sidebar}>
        <Scrollspy items={ sectionIds } currentClassName={styles.active} className='list-group' style={{marginBottom: '0'}}>
          {
            sections.map((section,i) => {
              
              if (i === 0) {
                return (
                  <a className='list-group-item text-center overflow-ellipsis' key={i}>
                    <span className="sidebar-nav-title-text ng-binding" style={{fontWeight: '600'}}>{section.label}</span>
                  </a>
                );
              } else {
                return (
                  <a onClick={smoothlyScroll} href={`#${section.id}`} className={`list-group-item overflow-ellipsis `} key={i}>
                    <i className={`${section.icon} mr-s`}></i><span className="sidebar-item-text">{section.label}</span>
                  </a>
                ); 
              }

            })
          }
        </Scrollspy>
        { (onSave || onBack) && <div className={styles.buttons}>
          {onBack && <Button label='Back' color='primary' onClick={onBack} icon='arrow-left'/>}
          {onSave && <Button label='Save' color='success' onClick={onSave} icon='floppy-o' disabled={saveDisabled} />}
        </div>}
      </div>
    </nav>
  );
}

RightMenu.propTypes = {
  sections: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string,
    id: React.PropTypes.string,
  })).isRequired,
  onSave: React.PropTypes.func,
  onBack: React.PropTypes.func,
};

export default RightMenu;
