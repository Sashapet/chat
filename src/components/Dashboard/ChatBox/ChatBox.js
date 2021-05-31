import React, {useEffect, useState} from 'react'
import Messages from './Messages'
import {useDashboard} from '../../../context/DashboardContext';
import {useMessage} from '../../../context/MessageContext';
import GrowWrapper from '../../../style/components/Wrappers/GrowWrapper'
import ProfileWrapper from '../../../style/components/Wrappers/ProfileWrapper'
import MessageInput from './MessageInput'
import Img from '../../../style/components/Img'
import Name from '../../../style/components/Name'

const ChatBox = () => {

const {chatInfo, setShowProfile, setShowChat} = useDashboard();
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
        <GrowWrapper>
            <ProfileWrapper>
                <i
                    className="fas fa-angle-left backIcon"
                    onClick={()=>{setShowProfile(false); setShowChat(false);}}
                >
                </i>
                <div>
                    <Img
                        style={{visibility:imageLoaded ? 'visible' : 'hidden'}} 
                        onLoad={()=>setImageLoaded(true)} 
                        src={user.avatarUrl} 
                        alt='profilePicture'
                    />
                </div>
                <Name blue>{user.firstname} {user.lastname}</Name>
            </ProfileWrapper>
            <Messages />
            <MessageInput />
        </GrowWrapper>
    )
}
export default ChatBox;