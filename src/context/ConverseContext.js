import React, {useContext, useState} from 'react'
import {database, auth} from '../firebase/firebase'
const ConverseContext = React.createContext()

export const useConverse = () => {
    return useContext(ConverseContext);
}   

export const ConverseProvider = ( {children} ) => {

        const [conversations, setConversations] = useState(null);
        const [loadConvers, setLoadConvers] = useState(false);
        const [conversationError, setConversationError] = useState(false);
        const [countConvers, setCountConvers] = useState(0);
        const [users, setUsers] = useState([]);

        //FETCHIN CONVERSATIONS
        const fetchConvers = async () => {
            const uid = auth.currentUser.uid;
            const converseRef = database.ref('/conversations/'+uid);
            let queryRef = converseRef.limitToFirst(5);
            try {
                setLoadConvers(true);
                setConversationError(false);
                //TAKING SNAPSHOT OF CONVERSATIONS
                await queryRef.on('value', snapshot => {
                    if (snapshot.val()) {
                        const data = snapshot.val();
                        //SAVING TO NEW ARRAY
                        let room = [];
                        for(let i in data){
                            const roomInfo = data[i];
                            room.push(roomInfo);
                        }
                        //UPDATE
                        setConversations(room);  
                    }else{
                        setConversationError('Something happened with our database, please contact our support!')
                    }
                })
            } catch(e) {
                setLoadConvers(false);
            }
        }
        //FETCHIN PARTICULAR USER
        const fetchUserData = async (id) => {
            const userRef = database.ref('/users');
            try {
                userRef.on('value', snapshot => {
                    const data = snapshot.val();
                        if(data){
                            for(let i in data){
                                if (data[i].id === id) {
                                    let user = data[i];
                                    setUsers(prevState => {
                                        let findUser = prevState.find(user=>user.id === id);
                                        if (!findUser) {
                                            return [
                                                ...prevState,
                                                user
                                            ] 
                                        } return prevState;
                                    })
                                }
                            }
                        }else{
                            setLoadConvers(false);
                            setConversationError('Something happened with our database, please contact our support!')
                        }
                })
            }catch(e){
                setLoadConvers(false);
                console.log(e.message);
            }
        }
        //SELECT
        const selectConverse = async (roomId) => {
            const uid = auth.currentUser.uid;
            const converseRef = database.ref('/conversations/'+uid+'/');
            const selectedRef = database.ref('/conversations/'+uid+'/'+roomId);
            await converseRef.once('value', snapshot=> {
                if (snapshot.val()) {
                    snapshot.forEach((child)=>{
                        child.ref.update({
                            selected:false
                        })
                    })
                }
            })
            await selectedRef.update({
                selected:true
            })
        }
    const value = {
        fetchConvers,
        conversations,
        setConversations,
        users,
        setUsers,
        setLoadConvers,
        setCountConvers,
        countConvers,
        loadConvers,
        fetchUserData,
        conversationError,
        selectConverse
    }
    return (
        <ConverseContext.Provider value = {value}>
            {children}
        </ConverseContext.Provider>
    )
}
