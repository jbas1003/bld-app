import React from 'react';

function CPW({ children, show}) {
  const content = show && (<>{ children }</>);
  return content;
}

export default CPW;