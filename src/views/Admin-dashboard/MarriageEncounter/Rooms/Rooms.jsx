import React from 'react';

function Rooms({ children, show }) {
    const content = show && (<>{ children }</>);
    return content;
}

export default Rooms