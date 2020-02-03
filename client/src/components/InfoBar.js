import React from 'react';

import { Link } from 'react-router-dom'

import onlineIcon from '../icon/onlineIcon.png';
import closeIcon from '../icon/closeIcon.png';
import image from '../assests/boy.png'

import '../css/InfoBar.css';




const InfoBar = ({ room }) => (
    <div className="infoBar bd-highlight">
        <div className="img_cont d-inline ">
            <img src={image} className="rounded-circle user_img" />
            {/* <span class="online_icon"></span> */}
            <img className="onlineIcon online_icon" src={onlineIcon} alt="online icon" />
            <div className="user_info d-inline p-1 text-capitalize">
                <span>{room}</span>

            </div>
        </div>
        <div className="rightInnerContainer">
            <Link to={'/'}  >
                <img src={closeIcon} alt="close icon" />
            </Link>
        </div>

        {/* <div className="text-capitalize ml-2">{room}</div> */}


        {/* <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online icon" />
                <h3 className="text-capitalize">{room}</h3>

            </div>
            <div className="rightInnerContainer">
                <Link to={'/'}  >
                    <img src={closeIcon} alt="close icon" />
                </Link>
            </div> */}
    </div>
);

export default InfoBar;