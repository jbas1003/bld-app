import React from 'react'

function EmergencyContacts({ children, show }) {
    const content = show && (<>{ children }</>);
    return content;
}

export default EmergencyContacts