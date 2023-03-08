/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import './App.scss';
import Delete from './components/Delete/Delete';
import Edit from './components/Edit/Edit';
import Pagenation from './components/Pagenation/Pagenation';
import Table from './components/Table/Table';

function App() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState([])
  const [deleteUser, setDeleteUser] = useState()
  const [deletePopUp, setDeletePopUp] = useState(false)
  const [editUser, setEditUser] = useState()
  const [editPopUp, setEditPopUp] = useState(false)


  useEffect(() => {
    try {
      axios({
        method: 'get',
        url: "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
      }).then(response => { setUsers(response.data); localStorage.setItem("users", JSON.stringify(response.data)) })
    } catch (error) {
      alert(error.message)
    }
  }, [])

  useEffect(() => {
    setUsers(filterUsers(JSON.parse(localStorage.getItem("users")) || users, search))
  }, [search])

  const filterUsers = (users, keyword) => {
    keyword = keyword.toLowerCase()
    return users.filter(user => user.name.toLowerCase().includes(keyword) || user.email.toLowerCase().includes(keyword) || user.role.toLowerCase().includes(keyword))
  }

  const getAllIds = () => currentPageUsers.map(user => user.id)

  const deleteSelected = () => {
    const selectedUsersId = new Set([...selectedRows])
    const newUsers = JSON.parse(localStorage.getItem("users")).filter((item) => !selectedUsersId.has(item.id))
    localStorage.setItem("users", JSON.stringify(newUsers))
    setUsers(newUsers)
  }

  const rowsPerPage = 10
  const lastUserIndex = rowsPerPage * currentPage
  const fistuserIndex = lastUserIndex - rowsPerPage
  const currentPageUsers = users.slice(fistuserIndex, lastUserIndex)

  return (
    <div className="App">
      <input id="search" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder='search by name,email or role' />
      <Table
        currentPageUsers={currentPageUsers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        getAllIds={getAllIds}
        setDeleteUser={setDeleteUser}
        setDeletePopUp={setDeletePopUp}
        setEditUser={setEditUser}
        setEditPopUp={setEditPopUp} />
      <button className='delete-selected' onClick={deleteSelected}><RiDeleteBin6Fill size="1.2em" /><span style={{ marginLeft: ".5rem" }}>Delete Selected</span></button>
      <Pagenation currentPage={currentPage} setCurrentPage={setCurrentPage} users={users} rowsPerPage={rowsPerPage} />
      <Delete user={deleteUser} setUsers={setUsers} deletePopUp={deletePopUp} setDeletePopUp={setDeletePopUp} />
      <Edit user={editUser} setUsers={setUsers} editPopUp={editPopUp} setEditPopUp={setEditPopUp} />
    </div>
  );
}




export default App;
