import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectApi, setSearchData } from '../features/profile/ProfileSlice';

function Home () {
    const dispatch = useDispatch()
    const http = 'https://api.opendota.com'

    const [preloader, setPreloader] = useState(true)
    const [randomCards, setRandomCards] = useState([])

    const async_data = useSelector(selectApi)

    const resetArray = () => {
        let randCards = []
        let randArr = []
        if (async_data.length) {
            for (let i = 0; i < 4; i++) {
                let randomInt = Math.floor(Math.random() * async_data.length);
                if (!randArr.includes(randomInt)) {
                    randArr.push(randomInt)
                } else {
                    i--
                }
            }
            for (let randomInt of randArr) {
                randCards.push(async_data[randomInt])
            }
            setRandomCards(randCards)
        }
    }

    useEffect(() => {
        // setLocalData(async_data)
        setPreloader(false)
        resetArray()
    }, [async_data])

    useEffect(() => {
        const timer = setTimeout(() => {
            resetArray()
        }, 10000)
        return () => clearTimeout(timer);
    }, [randomCards])

    return (
        <div className="home-tab">
            {preloader ? <div className="lds-dual-ring"></div> : 
            <div className="home-tab-shirtcut">
                {randomCards.map((item, i) => 
                <Link key={i} to={'/'+item.name} className='home-shirtcut' style={{backgroundImage: `url(${http+item.img})`}}>
                    <div className='home-shirtcut-name'>
                        {item.localized_name}
                        <div className='home-shirtcut-content'>
                        <div className="card-data roles">
                            <span>Roles:</span>
                            {item.roles.map((item, i) => <div key={i}>{item}</div>)}
                        </div>
                        <div className="card-data attack-type">
                            <span>Attack Type:</span>
                            <div>{item.attack_type}</div>
                        </div>
                        </div>
                    </div>
                </Link>)}
            </div>}
        </div>
    )
}

export default Home