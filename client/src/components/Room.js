import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/Room.css'

const Room = (props) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading">Chat</h1>
                    <div>
                        <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div>
                        <input placeholder="Room" className="joinInput mt-20" type="text" room={room} onChange={(event) => setRoom(event.target.value)} />
                    </div>
                    <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={{ pathname: '/Chat', state: { name: name, room: room } }} >
                        <button className={'button mt-20'} type="submit">Join</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Room
