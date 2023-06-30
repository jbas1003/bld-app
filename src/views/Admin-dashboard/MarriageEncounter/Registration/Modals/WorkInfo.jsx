import React from 'react'

const WorkInfo = ({children, show}) => {
    const content = show && (<>{ children }</>);
    return content;
}

export default WorkInfo