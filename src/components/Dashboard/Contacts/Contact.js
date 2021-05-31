import React, {useState} from 'react'
import Img from '../../../style/components/Img'
import Name from '../../../style/components/Name'
import ProfileWrapper from '../../../style/components/Wrappers/ProfileWrapper'

const Contact = ({user}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    
    return (
        <ProfileWrapper contact>
            <Img 
                small
                style={{visibility:imageLoaded ? 'visible' : 'hidden'}} 
                onLoad={()=>setImageLoaded(true)} 
                src={user.avatarUrl} 
                alt='profilePicture' 
            />
            <Name small>{user.firstname} {user.lastname}</Name>
        </ProfileWrapper>
    )
}
export default Contact;