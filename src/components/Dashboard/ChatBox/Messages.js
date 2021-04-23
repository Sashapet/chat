import React, {useEffect} from 'react'
import Message from './Message'
import { useMessage } from '../../../context/MessageContext'
import { useUser } from '../../../context/UserContext'
import {useDashboard} from '../../../context/DashboardContext'
export default function Messages() {

    const {messages, loadingMessages, errorMessages} = useMessage();
    const {userData} = useUser();
    const {chatInfo} = useDashboard();
    //SCROLLING TO BOTTOM
    useEffect(() => {
        if (!loadingMessages && messages) {
            let messageScrollbar = document.querySelector('.messages');
            messageScrollbar.scrollTop = messageScrollbar.scrollHeight; 
        }
    }, [loadingMessages, messages])
    if(loadingMessages){
        return <div className="lds-ring chatbox"><div></div><div></div><div></div><div></div></div>
    }
    if (errorMessages) {
        return <h3 className='messageError'>{errorMessages}</h3>
    }
    const roomId = chatInfo.conversation.roomId;
    // console.log();
        return (
            <div className='messages'>
                {messages && roomId === messages[0].roomId && messages.map((message, index) => {
                    return (
                    <div 
                        className={message.userId === userData.id ? 'message-container' : 'message-container friend'}
                        key={index}
                    >   
                        <Message message={message} />
                    </div>
                    )
                })}
            </div>
        )
}
