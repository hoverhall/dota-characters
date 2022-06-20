import { useState, useEffect } from 'react'
import { selectFName, selectLName, setFName, setLName } from '../features/profile/ProfileSlice';
import { useDispatch, useSelector } from 'react-redux';

function SignIn () {
    const dispatch = useDispatch()
    const fname = useSelector(selectFName)
    const lname = useSelector(selectLName)

    const [_fname, _setFName] = useState('')
    const [_lname, _setLName] = useState('')

    useEffect(() => {
        _setFName(fname)
        _setLName(lname)
    }, [fname, lname])

    const setData = () => {
        dispatch(setFName(_fname))
        dispatch(setLName(_lname))
    }

    return (
        <div className='login-tab'>
            <span>SignIn</span>
            <input onChange={(e) => _setFName(e.target.value)} value={_fname} data-input='Input your first name'/>
            <input onChange={(e) => _setLName(e.target.value)} value={_lname} placeholder='Input your last name'/>
            <button onClick={setData}>Set Name</button>
        </div>
    )
}

export default SignIn