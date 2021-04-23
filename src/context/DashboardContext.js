import React, {useContext, useState} from 'react'

const DashboardContext = React.createContext()

export const useDashboard = () => {
    return useContext(DashboardContext);
}   

export function DashboardProvider( {children} ) {
    const [showProfile, setShowProfile] = useState(false);
    const [showChat, setShowChat] = useState(true);
    const [chatInfo, setChatInfo] = useState(false);

    const value = {
        setShowProfile,
        setShowChat,
        setChatInfo,
        showProfile,
        showChat,
        chatInfo
    }
    return (
        <DashboardContext.Provider value = {value}>
            {children}
        </DashboardContext.Provider>
    )
}
