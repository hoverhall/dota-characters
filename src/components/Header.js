import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { setSearchData, selectSearchData } from '../features/profile/ProfileSlice';
import { useSelector, useDispatch } from 'react-redux';

function Header () {
    const searchData = useSelector(selectSearchData)
    const dispatch = useDispatch()
    const [curPage, setCurPage] = useState(window.location.pathname)

    return (
        <header className="App-header">
            <ul className="nav-bar">
                <li className={`nav-bar-item ${curPage === '/' ? 'active' : ''}`}>
                    <Link onClick={() => setCurPage('/')} to={'/'}>Home</Link>
                </li>
                <li className={`nav-bar-item ${curPage === '/characters' ? 'active' : ''}`}>
                    <Link onClick={() => setCurPage('/characters')} to={'/characters'}>Characters</Link>
                </li>
                {curPage === '/characters' && <input 
                        onLoad={(e) => dispatch(setSearchData(e.target.value))}
                        onChange={(e) => dispatch(setSearchData(e.target.value))} 
                        value={searchData}
                        placeholder='find character' />}
            </ul>
        </header>
    )
}

export default Header