import React from 'react';

function Teachings({ children, show}) {
  const content = show && (<>{ children }</>);
  return content;
}

export default Teachings;