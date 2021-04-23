import React, {useContext, useState} from 'react'
import {auth, database} from '../firebase/firebase'

const MessageContext = React.createContext()

export const useMessage = () => {
    return useContext(MessageContext);
}

export function MessageProvider( {children} ) {

    const [loadingMessages, setLoadingMessages] = useState(false);
    const [errorMessages, setErrorMessages] = useState(false);
    const [messages, setMessages] = useState(null);

    const sendMessage = async (roomId, message) => {
        const id = auth.currentUser.uid;
        const messagesRef = await database.ref('/messages/'+roomId);
        const newMessageRef = await messagesRef.push();
        const date = new Date();
        try {
            let whitespace = false;
            if (!message.replace(/\s/g, '').length){
                whitespace = true;
            }
            if (!whitespace) {
                await newMessageRef.set({
                    userId:id,
                    message:message.trim(),
                    timestamp:date.getTime()
                })
                setMessages(prevState => [
                    ...prevState,
                    {
                        message,
                        userId:id
                    }
                ])
            }
        } catch(e) {
            setMessages(prevState => [
                ...prevState,
                {
                    message,
                    userId:id,
                    error:e.message
                }
            ]);
            console.log(e.message);
        }
    }
    const fetchMessages = async (roomId)  => {
        setErrorMessages(false);
        setLoadingMessages(true);
        const messagesRef = await database.ref('/messages/'+roomId);
        try{
            let queryRef = await messagesRef.orderByChild('timestamp');
            await queryRef.once('value', snapshot => {
                const data = snapshot.val()
                if (data) {
                    const newArray  = []
                    let obj = {
                        roomId
                    }
                    newArray.push(obj);
                    for(let i in data){
                        newArray.push(data[i])
                    }
                    setMessages(newArray);
                }else{
                    setErrorMessages('Something happened with our database! Please contact our support.');
                }
            })
            setLoadingMessages(false);
        } catch(e) {
            setErrorMessages(e.message);
            setLoadingMessages(false);
            console.log(e.message);
        }
    }
    const value = {
        sendMessage,
        fetchMessages,
        messages,
        setMessages,
        errorMessages,
        loadingMessages,
    }
    return (
        <MessageContext.Provider value = {value}>
            {children}
        </MessageContext.Provider>
    )
}
 