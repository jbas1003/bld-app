import React from 'react'

function Events({ children, show }) {
    const content = show && (<>{ children }</>);
    return content;
}

export default Events