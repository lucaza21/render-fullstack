import React from 'react';
import icnLoader from '../elements/loader.svg';

const Loader = ({ message }) => {
  return (
    
    <div>
      <img
        src={icnLoader}
        alt={message}
      />
      <p>{message}</p>
    </div>
  );
}

export default Loader






