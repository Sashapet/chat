import React from 'react'
import {useAuth} from '../../../context/AuthContext';
import {useDashboard} from '../../../context/DashboardContext'

export default function DropDown({user, dropdown, iconActive, showProfile}) {
const {logOut} = useAuth();
const {setUsers} = useDashboard();

const handleLogOut = async () => {
    await logOut();
    await setUsers([]);
}
    return (
    <>
        <div className='img'>
            <img src={user.avatarUrl} alt='profilePicture' />
        </div>
        <div className='flex-container'>
            <h3 className='user-name'>{user.firstname} {user.lastname}</h3>
            <div className='drop-container'>
                <i className={iconActive ? "fa fa-angle-down open dropIcon" : "fa fa-angle-down dropIcon"}></i>
                <div className={dropdown ? 'open menu' : 'menu'}>
                    <ul>
                        <li onClick={()=>showProfile(true)}>
                            <i className="far fa-user-circle"></i>
                            <h3 className='button' >My Profile</h3>
                        </li>
                        <li onClick={()=>handleLogOut()}>
                            <i className="fas fa-sign-out-alt"></i>
                            <h3 className='button'>Log Out</h3>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
    )
}
