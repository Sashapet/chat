import React, {useEffect, useState} from 'react'
import Contact from './Contact'
import { useConverse } from '../../../context/ConverseContext'
import { useDashboard } from '../../../context/DashboardContext'
import ContactWrapper from '../../../style/components/Wrappers/ContactWrapper'

const Contacts = () => {

    const { setShowProfile, setShowChat, setChatInfo} = useDashboard();
    const {conversations, users, setLoadConvers, loadConvers,
         fetchUserData, countConvers, setCountConvers, selectConverse} = useConverse();

    const [newConversations, setNewConversations] = useState(false);
 
    useEffect(() => {
        let newArray = [];
        //ATTACH USERS TO CONVERSATIONS
        if (conversations) {
           setCountConvers(0);
           conversations.forEach(conversation => {
               const id = conversation.id;
               fetchUserData(id);
               setCountConvers(prevState => prevState + 1)
           });
            if (countConvers === conversations.length) {
                conversations.forEach((conversation, index)=>{
                const user = users.find(user => user.id === conversation.id);
                if (user) {
                    let obj = {
                        conversation,
                        user,
                    }
                    newArray.push(obj);
                    if (conversation.selected) {
                        setChatInfo(obj);
                    }
                }
                })
                   setNewConversations(newArray);
                    setLoadConvers(false);
            }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversations, users])
    if (loadConvers) {
        return  (
            <div className="lds-ring" style={{left:'50%', transform:'translateX(-50%)'}}>
                <div></div><div></div><div></div><div></div>
            </div>
        )
    }
    return (
        <>
            {newConversations && newConversations.map((converse, index)=>{
                return (
                    <ContactWrapper
                        active={converse.conversation.selected ? true : false} 
                        key={index} 
                        onClick={()=>{
                            setShowProfile(false); 
                            setShowChat(true); 
                            setChatInfo(converse); 
                            selectConverse(converse.conversation.roomId)
                        }}
                        >
                        <Contact user={converse.user} conversation={converse.conversation} />
                    </ContactWrapper>
                )
            })}
        </>
    )
}
export default Contacts;