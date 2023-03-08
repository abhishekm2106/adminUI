import './Table.scss'
import { RiDeleteBin6Fill, RiEditBoxFill } from 'react-icons/ri';

function Table({ currentPageUsers, selectedRows, setSelectedRows, setDeleteUser, setDeletePopUp, setEditUser, setEditPopUp }) {
    const getAllIds = () => currentPageUsers.map(user => user.id)
    return (
        <table>
            <thead>
                <tr>
                    <th><input type="checkbox" onChange={(e) => { e.target.checked ? setSelectedRows(getAllIds()) : setSelectedRows([]) }} /></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {
                    currentPageUsers.map(user => (
                        <tr key={user.id} className={selectedRows.includes(user.id) ? 'selected' : ""}>
                            <td><input type="checkbox" checked={selectedRows.includes(user.id)} onChange={(e) => { e.target.checked === true ? setSelectedRows([...selectedRows, user.id]) : setSelectedRows(selectedRows.filter((item) => item !== user.id)) }} /></td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className='actions' onClick={() => { setEditUser(user); setEditPopUp(true) }}><RiEditBoxFill /></button>
                                <button className='actions' onClick={() => { setDeleteUser(user); setDeletePopUp(true) }}><RiDeleteBin6Fill /></button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Table