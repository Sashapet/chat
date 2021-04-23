import React, {useState} from 'react'
import { useConverse } from '../../../context/ConverseContext'
import { useUser } from '../../../context/UserContext'

export default function Message({message}) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const {userData} = useUser();
    const {users} = useConverse();
    let user;
    if (message.userId === userData.id) {
        user = userData;
    }else{
        user = users.find(user=>user.id===message.userId);
    }
    if (!user) {
        return <h1>Someting Weird Happened</h1>
    }
    const flexContainer = {
        display:'flex',
        alignItems:'center',
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
        <div className='message'>
            {userData.id !== message.userId && (
                <div className='avatar'>
                    <img 
                        style={{visibility:imageLoaded ? 'visible' : 'hidden'}} 
                        onLoad={()=>setImageLoaded(true)} 
                        src={user.avatarUrl} 
                        alt='avatar' 
                    />
                </div>
            )}

            <div className='text-container'>
                <div className='name'>
                    {userData.id === message.userId ? <h2>me</h2> : <h2 className='friendName'>{user.firstname}   {user.lastname}</h2>}
                </div>
                <div style={message.error && flexContainer} >
                    <div className='text'>
                        <h3>{message.message}</h3>
                    </div>
                   {message.error && <i class="fa fa-exclamation-circle" style={errorStyle}></i>} 
                </div>
            </div>
            {message.error && <h1 style={errorText}>Not delivered</h1>}
        </div>
    )
}
