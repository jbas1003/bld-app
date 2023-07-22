import React from 'react'

function Nations({ children, show }) {
    const content = show && (<>{ children }</>);
    return content;
}

export default Nations