import React from 'react'

function Inviter({children, show}) {
    const content = show && (<>{ children }</>);
    return content;
}

export default Inviter