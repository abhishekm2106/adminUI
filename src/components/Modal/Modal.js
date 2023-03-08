import React from 'react'
import './Modal.scss'

function Modal({ children, popUp }) {
    return (
        <div className={`overlay ${popUp ? 'popup' : ''}`}>
            {
                children
            }
        </div>
    )
}

export default Modal