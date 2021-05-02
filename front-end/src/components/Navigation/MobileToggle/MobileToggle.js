//import statements
import React from 'react';

import './MobileToggle.css';

//set up mobile toggle
const mobileToggle = props => (
  <button className="mobile-toggle" onClick={props.onOpen}>
    <span className="mobile-toggle__bar" />
    <span className="mobile-toggle__bar" />
    <span className="mobile-toggle__bar" />
  </button>
);

//export mobile toggle
export default mobileToggle;
