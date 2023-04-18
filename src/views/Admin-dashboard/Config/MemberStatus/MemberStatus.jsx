import React from 'react'

function MemberStatus({ children, show }) {
    const content = show && (<>{ children }</>);
    return content;
}

export default MemberStatus