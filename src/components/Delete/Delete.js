import React from 'react'
import './Delete.scss'

function Delete({ user, setUsers, deletePopUp, setDeletePopUp }) {
    const deleteUser = () => {
        const newUsers = JSON.parse(localStorage.getItem("users")).filter((item) => user.id !== item.id)
        localStorage.setItem("users", JSON.stringify(newUsers))
        setUsers(newUsers)
        cancelDelete()
    }

    const cancelDelete = () => {
        setDeletePopUp(false)
    }
    return (
        <div className={`delete ${deletePopUp ? 'popup' : ''}`}>
            <div className='question'>Are you sure you want to delete data for user: <strong>{user?.name}</strong> ?</div>
            <div className='buttons'>
                <button onClick={deleteUser}>yes</button>
                <button onClick={cancelDelete}>no</button>
            </div>
        </div>
    )
}

export default Delete