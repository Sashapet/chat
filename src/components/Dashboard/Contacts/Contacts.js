import React, {useEffect, useState} from 'react'
import Contact from './Contact'
import { useDashboard } from '../../../context/DashboardContext'

export default function Contacts({conversations, showProfile, setChatInfo}) {
    const {users} = useDashboard();
    
    const [newConversations, setNewConversations] = useState(false);

    useEffect(() => {
        let newArray = [];
        if (users.length === conversations.length+1) {
            conversations.forEach(conversation => {
                const user = users.find(user => user.id === conversation.id);
                let obj = {
                    conversation,
                    user,
                    active:false
                }
                console.log(obj);
                newArray.push(obj);
            });
            newArray[0].active = true;
            setNewConversations(newArray);
            setChatInfo(newArray[0]);
        }else{
            console.log('dont have it!');
            console.log(users.length , conversations.length);
            console.log(users);
        }
    }, [users, conversations])
    const setActive = (index) => {
        let newArray = newConversations;
        newArray.forEach(conversation => {
            conversation.active = false;
        });
        newArray[index].active = true;
        setNewConversations(newArray);
    }
    console.log(newConversations);
    return (
        <div className='contacts'>
            {newConversations && newConversations.map((conversation, index)=>{
                return (
                    <div 
                        className={conversation.active ? 'contact active' : 'contact'} 
                        key={index} 
                        onClick={()=>{showProfile(false); setChatInfo(conversation); setActive(index)}}>
                        <Contact user={conversation.user} />
                    </div>
                )
            })}
        </div>
    )
}
