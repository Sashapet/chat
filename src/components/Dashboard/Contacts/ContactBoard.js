import React, {useState, useEffect} from 'react'
import {useConverse} from '../../../context/ConverseContext'
import DropDown from './DropDown'
import Contacts from './Contacts'
import GrowWrapper from '../../../style/components/Wrappers/GrowWrapper'
import ProfileWrapper from '../../../style/components/Wrappers/ProfileWrapper'
import ArrayWrapper from '../../../style/components/Wrappers/ArrayWrapper'
import Input from '../../../style/components/Input'
import { useDashboard } from '../../../context/DashboardContext'

const ContactBoard = ({user}) => {
    const [dropdown, setDropDown] = useState(false);
    const [iconActive, setIcon] = useState(false);
    const {fetchConvers} = useConverse();
    const {setShowProfile, setShowChat} = useDashboard();
    useEffect(() => {
        fetchConvers();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const searchContainer = {
        height: '25px',
        width: '90%',
        margin: '10px auto'
    }
    const handleProfile = () => {
        if(window.innerWidth > 780)
            setDropDown(!dropdown)
        else
            setShowProfile(true);
            setShowChat(false);
    }
    return (
        <GrowWrapper>
            <ProfileWrapper
                onClick={()=>handleProfile()}
                onMouseOver={()=>setIcon(true)}
                onMouseOut={()=>setIcon(false)}
            >
                <DropDown
                    user={user} 
                    dropdown={dropdown} 
                    iconActive={iconActive}
                />
            </ProfileWrapper>
            <div style={searchContainer}>
                <Input search type='text' placeholder='Search' />
            </div>
            <ArrayWrapper>
                <Contacts />
            </ArrayWrapper>
        </GrowWrapper>
    )
}
export default ContactBoard;