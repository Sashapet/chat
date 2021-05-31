import React, {useEffect} from 'react'
import Message from './Message'
import { useMessage } from '../../../context/MessageContext'
import { useUser } from '../../../context/UserContext'
import {useDashboard} from '../../../context/DashboardContext'
import ArrayWrapper from '../../../style/components/Wrappers/ArrayWrapper'
import MessageWrapper from '../../../style/components/Wrappers/MessageWrapper'
import Text from '../../../style/components/Text'

const Messages = () => {
    const {messages, loadingMessages, errorMessages} = useMessage();
    const {userData} = useUser();
    const {chatInfo} = useDashboard();
    //SCROLLING TO BOTTOM
    useEffect(() => {
        if (!loadingMessages && messages) {
            let messageScrollbar = document.querySelector('#messages');
            messageScrollbar.scrollTop = messageScrollbar.scrollHeight; 
        }
    }, [loadingMessages, messages])
    if(loadingMessages){
        return <div className="lds-ring chatbox"><div></div><div></div><div></div><div></div></div>
    }
    if (errorMessages) {
        return <Text middleError>{errorMessages}</Text>
    }
    const roomId = chatInfo.conversation.roomId;

        return (
            <ArrayWrapper messages id='messages'>
                {messages && roomId === messages[0].roomId && messages.map((message, index) => {
                    return (
                    <MessageWrapper 
                        friend={message.userId === userData.id ? false : true}
                        key={index}
                    >   
                        <Message message={message} />
                    </MessageWrapper>
                    )
                })}
            </ArrayWrapper>
        )
}
export default Messages