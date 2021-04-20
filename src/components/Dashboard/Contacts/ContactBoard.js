import React, {useState, useEffect} from 'react'
import {useDashboard} from '../../../context/DashboardContext'
import DropDown from './DropDown'
import Contacts from './Contacts'

export default function ContactBoard({showProfile, user, setChatInfo}) {
    const [dropdown, setDropDown] = useState(false);
    const [iconActive, setIcon] = useState(false);
    const {fetchConvers, conversations} = useDashboard();



    useEffect(() => {
        fetchConvers();
    }, [])
    if (!user) {
        return <h1>Loading...</h1>
    }
    return (
        <div className='contacts-container'>
            <div className='profile' >
                <div 
                    className={dropdown ? 'open profile-container' : 'profile-container'}
                    onClick={()=>setDropDown(!dropdown)}
                    onMouseOver={()=>setIcon(true)}
                    onMouseOut={()=>setIcon(false)}
                >
                    <DropDown 
                        user={user} 
                        dropdown={dropdown} 
                        iconActive={iconActive}
                        showProfile={showProfile} 
                    />
                </div>
            </div>
            <div className='search'>
                <input type='text' placeholder='Search' />
            </div>
            {conversations === null ? <h1>Loading...</h1> : 
            <Contacts 
                conversations={conversations} 
                showProfile={showProfile} 
                setChatInfo={setChatInfo}
            />}
        </div>
    )
}
