import React from 'react'

const Result = ({children, show}) => {
    const content = show && (<>{ children }</>);
    return content;
}

export default Result