import React from 'react';

import '../css/Message.css';

import ReactEmoji from 'react-emoji';
import image from '../assests/boy.png'



const Message = ({ message: { text, user }, name }) => {
    let isSentByCurrentUser = false;
    console.log('message', user)

    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
        console.log('text is image', text)
    }



    return (
        isSentByCurrentUser
            ? (

                <div className="d-flex justify-content-end p-4 mb-4">
                    {text.text ? <div className="msg_cotainer_send">
                        <img src={text.text} className='msg_img' />
                    </div> :
                        <div className="msg_cotainer_send">
                            {ReactEmoji.emojify(text)}
                            {/* <span className="msg_time_send">{trimmedName}</span> */}
                        </div>
                    }
                    {/* <div className="img_cont_msg"> <img src={image} className="rounded-circle user_img_msg" /></div> */}
                </div>
            )
            : (
                <div className="d-flex justify-content-start p-4 mb-4">
                    <div className="img_cont_msg">
                        <img src={image} className="rounded-circle user_img_msg" />
                    </div>

                    {text.text ? <div className="msg_cotainer">
                        <img src={text.text} className='msg_img' />
                    </div> :
                        <div className="msg_cotainer">
                            {ReactEmoji.emojify(text)}
                            <span className="msg_time">{user}</span>
                        </div>


                    }
                </div>
            )
    );
}

export default Message;