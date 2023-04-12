import React from 'react'

function EventTypeCategories({ children, show }) {
    const content = show && (<>{ children }</>);
    return content;
}

export default EventTypeCategories