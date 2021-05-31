import React, {useState} from 'react'
import {useAuth} from '../../../context/AuthContext';
import {useConverse} from '../../../context/ConverseContext'
import { useDashboard } from '../../../context/DashboardContext';
import { useMessage } from '../../../context/MessageContext';
import { useUser } from '../../../context/UserContext'
import Img from '../../../style/components/Img'
import Name from '../../../style/components/Name'
import Text from '../../../style/components/Text'

const DropDown = ({dropdown, iconActive}) => {
    const {logOut, setCurrentUser} = useAuth();
    const {setUsers, setConversations} = useConverse();
    const {setUserData, userData} = useUser();
    const {setShowProfile, setShowChat, setChatInfo} = useDashboard();
    const {setMessages} = useMessage();
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleLogOut = async () => {
        await setConversations([]);
        await setUsers([]);
        await setMessages(null)
        await setChatInfo(false);
        await setCurrentUser(null);
        await setUserData();
        await setShowProfile(false);
        await setShowChat(true);
        await logOut();
    }
    if (!userData) {
        return <h1>Loading...</h1>
    }
    return (
    <>
        <div>
            <Img 
                style={{visibility:imageLoaded ? 'visible' : 'hidden'}} 
                onLoad={()=>setImageLoaded(true)} 
                src={userData.avatarUrl} 
                alt='profilePicture' 
            />
        </div>
        <div className='dropDown-container'>
            <Name>{userData.firstname} {userData.lastname}</Name>
            <div className='dropDown'>
                <i className={iconActive ? "fa fa-angle-down open dropIcon" : "fa fa-angle-down dropIcon"}></i>
                <div className={dropdown ? 'open menu' : 'menu'}>
                    <ul>
                        <li onClick={()=>{
                            setShowProfile(true);
                            setShowChat(false);
                        }}>
                            <i className="far fa-user-circle"></i>
                            <Text dropdown>My Profile</Text>
                        </li>
                        <li onClick={()=>handleLogOut()}>
                            <i className="fas fa-sign-out-alt"></i>
                            <Text dropdown>Log Out</Text>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
    )
}
export default DropDown;