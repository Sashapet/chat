import React,{useRef} from 'react'
import {useDashboard} from '../../../context/DashboardContext'
import { useMessage } from '../../../context/MessageContext';
 
export default function MessageInput() {
    const messageRef = useRef();
    const {chatInfo} = useDashboard();
    const {sendMessage} = useMessage();

    const handleSubmit = async (e)  => {
        e.preventDefault();
        let roomId = chatInfo.conversation.roomId;
        await sendMessage(roomId, messageRef.current.value);
        let messageScrollbar = document.querySelector('.messages');
        messageScrollbar.scrollTop = messageScrollbar.scrollHeight;
        document.querySelector('.input').reset();
    }

    return (
        <div className='chat-input'>
            <i className="far fa-smile"></i>
            <form className='input' onSubmit={handleSubmit} >
                <input type='text' ref={messageRef} placeholder='Message...' name='message' />
                <i className="fas fa-paper-plane" onClick={handleSubmit}></i>
            </form>
            <i className="fas fa-microphone"></i>
        </div>
    )
}
