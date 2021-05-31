import React, {useEffect} from 'react'
import ContactBoard from './Contacts/ContactBoard'
import ChatBox from './ChatBox/ChatBox'
import Profile from './Profile'
import {useUser} from '../../context/UserContext'
import {useDashboard} from '../../context/DashboardContext'
import { useConverse } from '../../context/ConverseContext'
import SideWrapper from '../../style/components/Wrappers/SideWrapper'
import { ThemeProvider } from 'styled-components'
import Text from '../../style/components/Text'

const Dashboard = () => {   
    const { showProfile, showChat} = useDashboard();
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
        return <div className='dashboard'><Text middleError>{userDataError}</Text></div>
    }
    if (conversationError) {
        return <div className='dashboard'><Text middleError>{conversationError}</Text></div>
    }

    const colors = {
        primary: '#004bc4',
        secondary : '#003a96',
        third:'#00B4DB',
        primaryDash:'#e6e6e6',
        secondaryDash:'#f5f5f5'
    }

    return (
        <div className='dashboard'>
            <ThemeProvider theme={colors}>
                <SideWrapper left view={(showChat || showProfile) ? false : true}>
                    <ContactBoard 
                        user={userData}
                    />
                </SideWrapper>
                <SideWrapper view={(showChat || showProfile) ? true : false}>
                    {showProfile ? <Profile user={userData} /> : <ChatBox />}
                </SideWrapper>
            </ThemeProvider>
        </div>
    )
}
export default Dashboard;