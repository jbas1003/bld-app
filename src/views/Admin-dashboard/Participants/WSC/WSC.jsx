import React from 'react';

function WSC({ children, show }) {
  const content = show && (<>{ children }</>);
  return content;
}

export default WSC;