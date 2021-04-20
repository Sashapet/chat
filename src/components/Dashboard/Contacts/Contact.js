import React, {useEffect} from 'react'
import Scrollbar from 'smooth-scrollbar'

export default function Contact({user}) {
    
    useEffect(() => {
        let options = {
            'damping':0.25,
            'alwaysShowTracks':false
        } 
        Scrollbar.init(document.querySelector('.contacts'), options);
    }, [])

    return (
        <div className='contact-profile'>
            <img src={user.avatarUrl} alt='profilePicture' /> 
            <h2>{user.firstname} {user.lastname}</h2>
        </div>
    )
}
