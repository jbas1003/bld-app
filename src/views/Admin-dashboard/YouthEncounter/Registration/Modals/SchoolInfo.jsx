import React from 'react'

const SchoolInfo = ({children, show}) => {
    const content = show && (<>{ children }</>);
    return content;
}

export default SchoolInfo;