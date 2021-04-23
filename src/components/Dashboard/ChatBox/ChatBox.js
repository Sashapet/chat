import React, {useEffect, useState} from 'react'
import Messages from './Messages'
import {useDashboard} from '../../../context/DashboardContext';
import {useMessage} from '../../../context/MessageContext';

export default function ChatBox() {

const {chatInfo} = useDashboard();
const {fetchMessages, } =  useMessage();
const [imageLoaded, setImageLoaded] = useState(false);
    useEffect(() => {
        if (chatInfo) {
            let roomId = chatInfo.conversation.roomId;
            fetchMessages(roomId);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatInfo])

    if (!chatInfo) {
        return null;
    }
    let user = chatInfo.user;
    return (
        <div className='chatbox-container'>
            <div className='profile'>
                <img 
                    style={{visibility:imageLoaded ? 'visible' : 'hidden'}} 
                    onLoad={()=>setImageLoaded(true)} 
                    src={user.avatarUrl} 
                    alt='profilePicture'
                />
                <h3>{user.firstname} {user.lastname}</h3>
            </div>
            <Messages />
        </div>
    )
}
