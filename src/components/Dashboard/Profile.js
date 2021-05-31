import React from 'react'
import {useUser} from '../../context/UserContext';
import {Formik} from 'formik'
import { updateSchema } from '../../validations/validations'
import TextInput from '../Inputs/TextInput'
import PictureInput from '../Inputs/PictureInput'
import Button from '../../style/components/Button'
import Text from '../../style/components/Text'
import ProfileWrapper from '../../style/components/Wrappers/ProfileWrapper'
import ArrayWrapper from '../../style/components/Wrappers/ArrayWrapper'
import ErrorWrapper from '../../style/components/Wrappers/ErrorWrapper'
import Img from '../../style/components/Img'
import { useDashboard } from '../../context/DashboardContext';

const Profile = ({user}) => {

const {updateUser, uploadError, firstnameLoading,
     lastnameLoading, avatarLoading} = useUser();

     const {setShowProfile, setShowChat} = useDashboard();

const handleClick = () => {
    const avatar = document.getElementById('avatarInput');
    avatar.click();
}

return (
<>
<ProfileWrapper profile='true'>
    <i
        className="fas fa-angle-left backIcon"
        onClick={()=>{setShowProfile(false); setShowChat(false);}}
    >
    </i>
    <Text profile='true'>My Profile</Text>
</ProfileWrapper>
<ArrayWrapper profile='true'>
    <Formik
        initialValues = {{
            firstname: user.firstname,
            lastname: user.lastname
        }}
        validationSchema = {updateSchema}
    >
        {({
            errors,
            touched,
            values,
        })=>{
            let error;
            if (uploadError) {
                error = <Text error>{uploadError}</Text>;
            }
            if (errors.firstname && touched.firstname) {
                    error = <Text error>{errors.firstname}</Text>;
            } else if (errors.lastname && touched.lastname) {
                error = <Text error>{errors.lastname}</Text>; 
            }
            return (
            <form className='form-container' onSubmit={(e)=>e.preventDefault()}>
                <div className='avatar' onClick={()=>handleClick()}>
                    {/* hidden input */}
                    {!avatarLoading ? (
                        <>
                            <PictureInput 
                                name='avatar'
                                type='file'
                                style={{display:'none'}}
                                id='avatarInput'
                            />

                            <Img profile='true' src={user.avatarUrl} alt='profileAvatar' />
                            <i className="fas fa-plus-circle"></i>
                        </>
                        ) : (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>)
                    }                            
                </div>
                <div className='input'>
                    <TextInput
                        name='firstname'
                        placeholder='First Name'
                    />
                    <i className="fa fa-user"></i>
                    <Button 
                        profile='true'
                        disabled={(user.firstname === values.firstname || errors.firstname) ? true : false} 
                        type='button'
                        onClick={async () => !errors.firstname && updateUser('firstname', values.firstname)}
                    >
                        {firstnameLoading ? 'Loading...' : 'Update'}
                    </Button>
                </div>
                <div className='input'> 
                    <TextInput 
                        name='lastname'
                        placeholder='Last Name'
                    />
                    <i className="fa fa-user"></i>
                    <Button
                        profile='true'
                        id='updtbutton'
                        disabled={(user.lastname === values.lastname || errors.lastname) ? true : false} 
                        type='button'
                        onClick={async () => !errors.lastname && updateUser('lastname', values.lastname)}
                    >
                        {lastnameLoading ? 'Loading...' : 'Update'}
                        
                    </Button>
                </div>
                <ErrorWrapper>
                    {error}
                </ErrorWrapper>
            </form> 
            )
        }}
    </Formik>
</ArrayWrapper>
</>
)
}
export default Profile;