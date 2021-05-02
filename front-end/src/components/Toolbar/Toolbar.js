//import statements
import React from 'react';

import './Toolbar.css';

//set up toolbar
const toolbar = props => (
    <div className="toolbar">
       {props.children}
    </div>
);

//export toolbar
export default toolbar;