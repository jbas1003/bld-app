import React from 'react'

function MemberAccounts({ children, show }) {
    const content = show && (<>{ children }</>);
    return content;
}

export default MemberAccounts