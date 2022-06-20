
function Card (props) {
    const http = 'https://api.opendota.com'
    
    const character = props.data
    return (
        <div className="selected-card">
            <div className="card-img" style={{backgroundImage: `url(${http+character.img})`}}></div>
            <div className="character-name">{character.localized_name}</div>
            <div className="card-data roles">
                <h2>Roles:</h2>
                {character.roles.map((item, i) => <div key={i}>{item}</div>)}
            </div>
            <div className="card-data attack-type">
                <h2>Attack Type:</h2>
                <div>{character.attack_type}</div>
            </div>
            <div className="card-data attack-type">
                <h2>Attack Range:</h2>
                <div>{character.attack_range}</div>
            </div>
            <div className="card-data attack-type">
                <h2>Attack Rate:</h2>
                <div>{character.attack_rate}</div>
            </div>
            <div className="card-data attack-type">
                <h2>Move Speed:</h2>
                <div>{character.move_speed}</div>
            </div>
        </div>
    )
}

export default Card