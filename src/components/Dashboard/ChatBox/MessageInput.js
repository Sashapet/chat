import React,{useRef, useEffect} from 'react'
import {useDashboard} from '../../../context/DashboardContext'
import { useMessage } from '../../../context/MessageContext';

const MessageInput = () => {
    const messageRef = useRef();
    const {chatInfo} = useDashboard();
    const {sendMessage} = useMessage();

    useEffect(() => {
        let textarea = document.querySelector('.textarea');
        textarea.addEventListener("keydown", e => {
            // Enter was pressed without shift key
            if (e.keyCode === 13 && !e.shiftKey)
            {
                // prevent default behavior
                e.preventDefault();
                handleSubmit(e);
            }
            });
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (e)  => {
        let textarea = document.querySelector('.textarea');
        e.preventDefault();
        textarea.style.pointerEvents = 'none';
        let message = messageRef.current.value;
        document.querySelector('.input').reset();
        let roomId = chatInfo.conversation.roomId;
        await sendMessage(roomId, message);
        let messageScrollbar = document.querySelector('#messages');
        messageScrollbar.scrollTop = messageScrollbar.scrollHeight;
        textarea.style.pointerEvents = 'visible';
    }

    const setInputHeight = (e, defaultHeight) => {
        if(e) {
            const target = e.target ? e.target : e;
            target.style.height = defaultHeight;
            target.style.height = `${target.scrollHeight}px`;
        }
    }

    return (
        <div className='chat-input'>
            <i className="far fa-smile"></i>
            <form className='input'>
                <textarea 
                    className="textarea"
                    onChange={(e) => setInputHeight(e, '30px')}
                    ref={messageRef}
                    placeholder='Message...' 
                    name='message'
                >
                </textarea>
                {/* <Input message type='text' ref={messageRef} placeholder='Message...' name='message' /> */}
                <i className="fas fa-paper-plane" onClick={handleSubmit}></i>
            </form>
            <i className="fas fa-microphone"></i>
        </div>
    )
}
export default MessageInput;