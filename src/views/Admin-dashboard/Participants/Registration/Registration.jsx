import React from 'react';

function Registration({ children, show }) {
  const content = show && (<>{ children }</>);
  return content;
}

export default Registration;