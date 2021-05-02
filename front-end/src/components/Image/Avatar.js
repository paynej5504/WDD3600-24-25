//import statements
import React from 'react';

import Image from './Image';
import './Avatar.css';

//create avatar and place selected image
const avatar = props => (
  <div
    className="avatar"
    style={{ width: props.size + 'rem', height: props.size + 'rem' }}
  >
    <Image imageUrl={props.image} />
  </div>
);

export default avatar;
