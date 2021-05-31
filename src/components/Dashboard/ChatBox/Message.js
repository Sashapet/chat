import React, {useState} from 'react'
import { useConverse } from '../../../context/ConverseContext'
import { useUser } from '../../../context/UserContext'
import Img from '../../../style/components/Img'
import Name from '../../../style/components/Name'
import MessageFlex from '../../../style/components/Wrappers/MessageFlex'
import MessageText from '../../../style/components/Wrappers/MessageText'
import Text from '../../../style/components/Text'

const Message = ({message}) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const {userData} = useUser();
    const {users} = useConverse();
    let user;
    if (message.userId === userData.id) {
        user = userData;
    }else{
        user = users.find(user=>user.id===message.userId);
        user = userData;
    }
    if (!user) {
        return <h1>Someting Weird Happened</h1>
    }
    const flexContainer = {
        display:'flex',
        alignItems:'center',
    }
    const flexMessage = {
        marginLeft: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
    const errorStyle = {
        color:'red',
        paddingLeft:'5px'
    }
    const errorText = {
        color:'red',
        fontSize:'10px'
    }
    return (
        <MessageFlex left={userData.id !== message.userId && true}>
            {userData.id !== message.userId && (
                <div className='avatar'>
                    <Img
                        chat
                        small
                        style={{visibility:imageLoaded ? 'visible' : 'hidden'}} 
                        onLoad={()=>setImageLoaded(true)} 
                        src={user.avatarUrl} 
                        alt='avatar' 
                    />
                </div>
            )}
            <div style={flexMessage}>
                {userData.id === message.userId ? <Name small black>me</Name> : <Name small black>{user.firstname}   {user.lastname}</Name>}
                <div style={message.error && flexContainer} >
                    <MessageText friend={userData.id !== message.userId && true}>
                        <Text chat friend={userData.id !== message.userId && true}>{message.message}</Text>
                    </MessageText>
                   {message.error && <i class="fa fa-exclamation-circle" style={errorStyle}></i>} 
                </div>
            </div>
            {message.error && <h1 style={errorText}>Not delivered</h1>}
        </MessageFlex>
    )
}
export default Message;