import React, {useEffect} from 'react'
import ContactBoard from './Contacts/ContactBoard'
import ChatBox from './ChatBox/ChatBox'
import Profile from './Profile'
import {useUser} from '../../context/UserContext'
import {useDashboard} from '../../context/DashboardContext'
import { useConverse } from '../../context/ConverseContext'
import MessageInput from './ChatBox/MessageInput'

export default function Dashboard() {   
    const { showProfile} = useDashboard();
    const {conversationError} = useConverse();
    const {fetchUserData, userData, userDataError, userDataLoading} = useUser();

    useEffect(() => {
        document.querySelector('.app').style.height='100vh';

        const fetchUser = async () => {
            await fetchUserData()
        }
        fetchUser();
        return () => {
            document.querySelector('.app').style.height=null;
        }
        
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

    if (userDataLoading) {
        return <div className="lds-ring dash"><div></div><div></div><div></div><div></div></div>
    }
    if(!userData || userDataError){
        return <div className='dashboard'><h3 className='userDataError'>{userDataError}</h3></div>
    }
    if (conversationError) {
        return <div className='dashboard'><h3 className='userDataError'>{conversationError}</h3></div>
    }

    return (
        <div className='dashboard'>
            <div className='left-side'>
                <ContactBoard 
                    user={userData}
                />
            </div>
            <div className='right-side'>
                {showProfile ? <Profile user={userData} /> : <ChatBox />}
            </div>
            {!showProfile && <MessageInput />}
        </div>
    )
}
