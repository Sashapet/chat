import React, {useRef} from 'react'
import Messages from './Messages'

import {useDashboard} from '../../../context/DashboardContext'

export default function ChatBox({room}) {

const {sendMessage} =  useDashboard();

   
    const messageRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendMessage(roomId, messageRef.current.value);
        document.querySelector('.input').reset();
    }
    
    if (!room) {
        return <h1>Loading...</h1>
    }
    let user = room.user;
    let roomId = room.conversation.roomId;
    return (
        <div className='chatbox-container'>
            <div className='profile'>
                <img src={user.avatarUrl} alt='profilePicture'/>
                <h3>{user.firstname} {user.lastname}</h3>
            </div>
            <Messages roomId={roomId} />
                <div className='chat-input'>
                    <i className="far fa-smile"></i>
                    <form className='input' onSubmit={handleSubmit} >
                        <input type='text' ref={messageRef} placeholder='Message...' name='message' />
                        <i className="fas fa-paper-plane" onClick={handleSubmit}></i>
                    </form>
                    <i className="fas fa-microphone"></i>
                </div>
        </div>
    )
}
