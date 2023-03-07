import React, { useEffect, useState } from 'react'
import './Edit.scss'

function Edit({ user, setUsers, editPopUp, setEditPopUp }) {
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [role, setRole] = useState(user?.role)
    const editUser = () => {
        const users = JSON.parse(localStorage.getItem("users"))
        for (let i = 0; i < users.length; i++) {
            if (user.id === users[i].id) {
                users[i].name = name
                users[i].email = email
                users[i].role = role
                break
            }
        }
        localStorage.setItem("users", JSON.stringify(users))
        setUsers(users)
        cancelEdit()
    }
    const cancelEdit = () => { setEditPopUp(false) }

    useEffect(() => {
        setName(user?.name)
        setEmail(user?.email)
        setRole(user?.role)
    }, [user])

    return (
        <div className={`edit ${editPopUp ? 'popup' : ''}`}>
            <form onSubmit={(e) => { e.preventDefault(); editUser() }}>
                <div>
                    <label htmlFor="name">Name : </label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="email">Email : </label>
                    <input type="text" id="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="role">Role : </label>
                    <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <input type="submit" />
                <button onClick={cancelEdit}>Cancel</button>
            </form>
        </div>
    )
}

export default Edit