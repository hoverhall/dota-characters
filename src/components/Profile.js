import { useState, useEffect, Fragment } from 'react'
import { selectApi, selectSearchData, setSearchData } from '../features/profile/ProfileSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
function Profile () {
    const dispatch = useDispatch()
    const http = 'https://api.opendota.com'

    const [localData, setLocalData] = useState([])
    const [preloader, setPreloader] = useState(true)
    const [layout, setLayout] = useState('middle')

    const searchResult = useSelector(selectSearchData)

    const async_data = useSelector(selectApi)

    const search = (input, searchedValue) => {
        let inputed = input.toLowerCase()
        let length = input.length
        
        let searched = searchedValue.toLowerCase()
        if (searched.includes(' ')) {
            searched = searched.split(' ')
            for (let item of searched) {
                if (item.slice(0, length) === inputed) {
                    return true
                }
            }
        } else if (searched.includes('-')) {
            searched = searched.split('-')
            for (let item of searched) {
                if (item.slice(0, length) === inputed) {
                    return true
                }
            }
        } else {
            if (searched.slice(0, length) === inputed) {
                return true
            }
        }
        return false
    }

    useEffect(() => {
        setLocalData(async_data)
        setPreloader(false)
    }, [async_data])

    useEffect(() => {
        // dispatch(setSearchData(""))
    }, [])

    return (
        <div className='profile-tab'>
            {preloader ? <div className="lds-dual-ring"></div> : <>
                <span>DOTA CHARACTERS</span>
                <div className='layout-buttons'>
                    <div onClick={() => setLayout('large')} className='large'> 
                        <div></div><div></div>
                        <div></div><div></div>
                    </div>
                    <div onClick={() => setLayout('middle')} className='middle'>
                        <div></div><div></div><div></div>
                        <div></div><div></div><div></div>
                        <div></div><div></div><div></div>
                    </div>
                    <div onClick={() => setLayout('small')} className='small'>
                        <div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div>
                    </div>
                </div>
                <div className={`api-cards ${layout}`}>
                    {localData.length > 0 && localData.map((item, i) => <Fragment key={i}>
                        {searchResult.length > 1 ? search(searchResult, item.localized_name) &&
                        <Link
                            to={'/'+item.name}
                            className={`api-card`}>
                            <div className='img' style={{backgroundImage: `url(${http+item.img})`}}></div>
                            <span>{item.localized_name}</span>
                        </Link> :
                        <Link
                            to={'/'+item.name}
                            className={`api-card`}>
                            <div className='img' style={{backgroundImage: `url(${http+item.img})`}}></div>
                            <span>{item.localized_name}</span>
                        </Link>}
                    </Fragment>)}
                </div>
            </>}
        </div>
    )
}

export default Profile