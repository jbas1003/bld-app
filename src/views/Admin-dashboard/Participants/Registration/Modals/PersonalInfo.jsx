import React from 'react'

const PersonalInfo = ({children, show}) => {
    const content = show && (<>{ children }</>);
    return content;
}

export default PersonalInfo