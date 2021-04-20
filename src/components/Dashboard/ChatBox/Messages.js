import React, {useEffect} from 'react'
import Message from './Message'
import { useDashboard } from '../../../context/DashboardContext'
import { useUser } from '../../../context/UserContext'
export default function Messages({roomId}) {

    const {fetchMessages, messages} = useDashboard();
    const {userData} = useUser();

    useEffect(() => {
        fetchMessages(roomId);
    }, [roomId])
    useEffect(() => {
        if (messages) {
            let messageBar = document.querySelector('.messages');
            messageBar.scrollTop = messageBar.scrollHeight - messageBar.clientHeight;
        }
    }, [messages])

    if(!messages){
        return <h1>Loading...</h1>
    }

    return (
        <div className='messages'>
            {messages.map((message, index) => {
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
