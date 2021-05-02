//import statements
import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const button = props =>
  !props.link ? (
    //create button
    <button
      className={[
        'button',
        `button--${props.design}`,
        `button--${props.mode}`
      ].join(' ')}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      type={props.type}
    >
      {props.loading ? 'Loading...' : props.children}
    </button>
  ) : (
    <Link
      className={[
        'button',
        `button--${props.design}`,
        `button--${props.mode}`
      ].join(' ')}
      to={props.link}
    >
      {props.children}
    </Link>
  );

  //export button
export default button;
