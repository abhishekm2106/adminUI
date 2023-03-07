/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
import './Pagenation.scss'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import { TbSquareRoundedChevronsLeftFilled, TbSquareRoundedChevronsRightFilled } from 'react-icons/tb';
import { useEffect } from 'react';

function Pagenation({ currentPage, setCurrentPage, users, rowsPerPage }) {
    const pages = Math.ceil(users.length / rowsPerPage)
    const arr = []
    for (let i = 0; i < pages; i++) arr.push(i + 1)

    //this useEffect is added to handle a corner case in pagenation
    useEffect(() => {
        if (currentPage > pages) setCurrentPage(1)
    }, [users])

    return (
        <div className='pagenation'>
            {currentPage === 1 ? "" : <button className='move-page' onClick={() => setCurrentPage(1)}><TbSquareRoundedChevronsLeftFilled /></button>}
            {currentPage === 1 ? "" : <button className='move-page' onClick={() => setCurrentPage(currentPage - 1)}><FaChevronCircleLeft /></button>}
            {
                arr.map(page => (<button key={page} className={page === currentPage ? "current" : "" + " page-button"} onClick={() => setCurrentPage(page)}>{page}</button>))
            }
            {currentPage === pages ? "" : <button className='move-page' onClick={() => setCurrentPage(currentPage + 1)}><FaChevronCircleRight /></button>}
            {currentPage === pages ? "" : <button className='move-page' onClick={() => setCurrentPage(pages)}><TbSquareRoundedChevronsRightFilled /></button>}
        </div>
    )
}

export default Pagenation