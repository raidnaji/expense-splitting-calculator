import React from 'react'

const Warning = ( { type, text }) => {
    return (
        <div className={`warning warning${type}`}>
            {text}
        </div>
    )
}

export default Warning;