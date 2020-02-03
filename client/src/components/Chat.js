import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import '../css/Chat.scss'
import InfoBar from './InfoBar'
import Input from './Input'
import Messages from './Messages'
import TextContainer from './TextContainer'
// import '../css/App.css'

let socket



const Chat = (props) => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState('');
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('Select File')
    const [uploadFile, setUploadFile] = useState({})



    const BaseURL = 'localhost:5000'

    useEffect(() => {

        const { name, room } = props.location.state;//we can directly get the data from an object using destruing

        console.log('name and room', name, room)

        setName(name)
        setRoom(room)

        console.log(props)
        socket = io(BaseURL)
        console.log(socket);

        socket.emit('join', { name, room }, () => {

        })


        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [BaseURL, props.location.state])

    useEffect(() => {
        socket.on('message', (message) => {
            console.log('message frm admin', message)
            setMessages([...messages, message]);
        });

        socket.on('addimage', (msg, img) => {
            console.log('add image')
            console.log(img)
            setMessage(img)

        })

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        })

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [messages])

    //if emit (to send something) in client then on (recieve) in server and vice versa

    const sendMessage = (event) => {
        event.preventDefault();
        console.log(event);

        if (message) {
            console.log('message vl come', message)
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }



    console.log('msd', message)
    console.log('msssg', messages)

    return (
        <div className="outerContainer">
            <div className="containers">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                {/* <div>
                    <img src={uploadFile} />
                </div> */}
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} setFile={setFile} setFileName={setFileName} socket={socket} name={name} />
            </div>
            {/* <TextContainer users={users} /> */}
        </div>
    )
}

export default Chat
