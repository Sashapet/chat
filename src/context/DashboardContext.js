import React, {useContext, useState} from 'react'
import {auth, database} from '../firebase/firebase'

const DashboardContext = React.createContext()

export const useDashboard = () => {
    return useContext(DashboardContext);
}

export function DashboardProvider( {children} ) {
    const [conversations, setConversations] = useState(null);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState(null);

    const fetchConvers = async () => {
        const id = auth.currentUser.uid;
        const converseRef = database.ref('/conversations/'+id);
        try {
            //ADDING CURRENT USER TO USERS ARRAY
            fetchUserData(id);
            //TAKING SNAPSHOT OF CONVERSATIONS IDS
            converseRef.on('value', snapshot => {
                const data = snapshot.val();
                //SAVING TO NEW ARRAY
                let room = [];
                for(let i in data){
                    const id = data[i].id;
                    const roomInfo = data[i];
                    room.push(roomInfo);
                    fetchUserData(id);
                }
                setConversations(room);
            })
        } catch(e) {
            console.log(e.message);
        }
    }
    const fetchUserData = async (id) => {
        const userRef = database.ref('/users');
        try {
            await userRef.on('value', snapshot => {
                const data = snapshot.val();
                for(let i in data){
                    if (data[i].id === id) {
                        let user = data[i];
                        setUsers(prevUser => {
                            return [
                                ...prevUser,
                                user
                            ]
                        })
                    }
                }
            })
        }catch(e){
            console.log(e.message);
        }
    }
    const sendMessage = async (roomId, message) => {
        const id = auth.currentUser.uid;
        const messagesRef = database.ref('/messages/'+roomId);
        const newMessageRef = messagesRef.push();
        const date = new Date();
        try {   
            await newMessageRef.set({
                userId:id,
                message,
                timestamp:date.getTime()
            })
        } catch(e) {
            console.log(e.message);
        }
    }
    const fetchMessages = async (roomId)  => {
        const messagesRef = database.ref('/messages/'+roomId);
        try{
            let queryRef = messagesRef.orderByChild('timestamp');
            queryRef.on('value', snapshot => {
                const data = snapshot.val();
                const newArray  = []
                for(let i in data){
                    newArray.push(data[i])
                }
                setMessages(newArray);
            })
        } catch(e) {
            console.log(e.message);
        }
    }
    const value = {
        fetchConvers,
        conversations,
        users,
        setUsers,
        sendMessage,
        fetchMessages,
        messages
    }
    return (
        <DashboardContext.Provider value = {value}>
            {children}
        </DashboardContext.Provider>
    )
}
