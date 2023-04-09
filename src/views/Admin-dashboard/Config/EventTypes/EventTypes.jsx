import React from 'react'

function EventTypes({ children, show }) {
    const content = show && (<>{ children }</>);
    return content;
}

export default EventTypes