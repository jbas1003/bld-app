import React from 'react'

const AddressInfo = ({children, show}) => {
    const content = show && (<>{ children }</>);
    return content;
}

export default AddressInfo