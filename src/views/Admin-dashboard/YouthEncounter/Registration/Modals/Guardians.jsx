import React from 'react'

function Guardians({ children, show }) {
    const content = show && (<>{ children }</>);
    return content;
}

export default Guardians;