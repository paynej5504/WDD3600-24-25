//import statements
import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import './MobileNavigation.css';

//set up mobile navigation
const mobileNavigation = props => (
  <nav className={['mobile-nav', props.open ? 'open' : ''].join(' ')}>
    <ul
      className={['mobile-nav__items', props.mobile ? 'mobile' : ''].join(' ')}
    >
      <NavigationItems
        mobile
        onChoose={props.onChooseItem}
        isAuth={props.isAuth}
        onLogout={props.onLogout}
      />
    </ul>
  </nav>
);

//export mobile navigation
export default mobileNavigation;
