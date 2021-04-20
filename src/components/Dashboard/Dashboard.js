import React, {useEffect, useState} from 'react'
import ContactBoard from './Contacts/ContactBoard'
import ChatBox from './ChatBox/ChatBox'
import Profile from './Profile'
import {useUser} from '../../context/UserContext'

export default function Dashboard() {
    const [showProfile, setShowProfile] = useState(false);
    const [chatInfo, setChatInfo] = useState(false);

    const {fetchUserData, userData} = useUser();

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

    if (!userData) {
        return <h1>Loading...</h1>
    }
    return (
        <div className='dashboard'>
            <div className='left-side'>
                <ContactBoard user={userData} showProfile={setShowProfile} setChatInfo={setChatInfo} />
            </div>
            <div className='right-side'>
                {showProfile ? <Profile user={userData}/> : <ChatBox room={chatInfo}  />}
            </div>
        </div>
    )
}
