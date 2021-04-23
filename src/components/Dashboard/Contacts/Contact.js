import React, {useState} from 'react'
export default function Contact({user}) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className='contact-profile'>
            <img 
                style={{visibility:imageLoaded ? 'visible' : 'hidden'}} 
                onLoad={()=>setImageLoaded(true)} 
                src={user.avatarUrl} 
                alt='profilePicture' 
            />
            <div className='flexContainer'>
                <h2>{user.firstname} {user.lastname}</h2>
            </div>
        </div>
    )
}
