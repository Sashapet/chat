import React from 'react'
import { useDashboard } from '../../../context/DashboardContext'
import {useUser} from '../../../context/UserContext'

export default function Message({message}) {
    const {userData} = useUser();
    const {users} = useDashboard();

    const user = users.find(user=>user.id===message.userId);
    
    console.log(user);
    return (
        <div className='message'>
            {userData.id !== message.userId && (
                <div className='avatar'>
                    <img src={user.avatarUrl} alt='avatar' />
                </div>
            )}
            <div className='text-container'>
                <div className='name'>
                    {userData.id === message.userId ? <h2>me</h2> : <h2>{user.firstname} {user.lastname}</h2>}
                </div>
                <div className='text'>
                    <h3>{message.message}</h3>
                </div>
            </div>
        </div>
    )
}
