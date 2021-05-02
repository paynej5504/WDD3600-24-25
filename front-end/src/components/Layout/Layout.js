//import statements
import React, { Fragment } from 'react';

import './Layout.css';

//layout
const layout = props => (
  <Fragment>
    <header className="main-header">{props.header}</header>
    {props.mobileNav}
    <main className="content">{props.children}</main>
  </Fragment>
);

//export layout
export default layout;
