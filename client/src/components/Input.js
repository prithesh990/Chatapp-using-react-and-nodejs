import React, { useState, useRef } from 'react';
import io from 'socket.io-client'

import '../css/Input.scss';
import { FiPaperclip } from 'react-icons/fi'
import { FaLocationArrow } from 'react-icons/fa'
import axios from 'axios'







// const fileUploader = () => {
//     // const fd=new FormData()
//     // fd.append('image',file,file.name)
//     // }
// }

const Input = ({ setMessage, sendMessage, message, setFileName, setFile, socket, name }) => {
    const FileInput = useRef(null);

    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();


    var flag = false


    console.log(socket);



    const onChange = (e) => {
        e.preventDefault()
        setFile(e.target.files[0])
        var file = e.target.files[0]
        setFileName(e.target.files[0].name)
        console.log('user image problem')
        const reader = new FileReader()
        reader.onload = (e) => {
            console.log('onload')
            socket.emit('userImage', reader.result)
        }
        console.log('file selected', file)
        reader.readAsDataURL(file)
    }




    if (message.text)
        document.getElementById('t').style.backgroundImage = `url('${message.text}')`;


    if (message.user === trimmedName) {
        isSentByCurrentUser = true;
    } else {

        console.log(isSentByCurrentUser)
    }





    // const onSubmit = async (e) => {
    //     e.preventDefault()
    //     const formData = new FormData();
    //     formData.append('uploadImage', file)

    //     try {
    //         const res = await axios.post(BaseURL, formData, {
    //             headers: { 'Content-Type': 'multipart/form-data' }
    //         }).then((res) => console.log(res))
    //         console.log(res)
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }


    //}
    return (


        // <form className="form">
        //     <input
        //         className="input"
        //         type="text"
        //         placeholder="Type a message..."
        //         value={message}
        //         onChange={({ target: { value } }) => setMessage(value)}
        //         onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        //     />
        //     <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
        // </form>
        <div className="input-group background-light">
            <div className="input-group-append">
                <input type="file" className="inputFile" onChange={onChange} ref={FileInput} />
                {/* <button onClick={onSubmit}>add</button> */}
                <span className="input-group-text attach_btn" onClick={() => {
                    flag = true
                    return FileInput.current.click()
                }}><FiPaperclip /></span>
            </div>

            {
                isSentByCurrentUser ? <input name="" id='t' className="type_msg form-control " type="text" value=''
                    onChange={({ target: { value } }) => setMessage(value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} /> :
                    message.text && !flag ?
                        <input name="" id='t' className="type_msg form-control bg" type="text" value=''
                            onChange={({ target: { value } }) => setMessage(value)}
                            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} /> :
                        <input name="" id='t' className="type_msg form-control bg " type="text" placeholder="Type your message..." value={message}
                            onChange={({ target: { value } }) => setMessage(value)}
                            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} />
            }
            <div className="input-group-append">
                <span className="input-group-text send_btn" onClick={e => sendMessage(e)}><FaLocationArrow /></span>
            </div>
        </div>
    )
}

export default Input;