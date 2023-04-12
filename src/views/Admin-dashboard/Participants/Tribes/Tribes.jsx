import React from 'react';

function Tribes({ children, show }) {
  const content = show && (<>{ children }</>);
  return content;
}

export default Tribes;