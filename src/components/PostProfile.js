import React from 'react'

export default function PostProfile(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.content}</p>
        </div>
    )
}