import React from 'react'
import {useUser} from '../../context/UserContext';
import {Formik} from 'formik'
import { updateSchema } from '../../validations/validations'
import TextInput from '../Inputs/TextInput'
import PictureInput from '../Inputs/PictureInput'

export default function Profile({user}) {

const {updateUser, uploadError, firstnameLoading,
     lastnameLoading, avatarLoading} = useUser();

const handleClick = () => {
    const avatar = document.getElementById('avatarInput');
    avatar.click();
}

return (
<>
<div className='profile-view'>
    <h3>My Profile</h3>
</div>
<div className='options'>
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
                error = <h2>{uploadError}</h2>;
            }
            if (errors.firstname && touched.firstname) {
                    error = <h2>{errors.firstname}</h2>;
            } else if (errors.lastname && touched.lastname) {
                error = <h2>{errors.lastname}</h2>; 
            }
            return (
            <form className='input-container' onSubmit={(e)=>e.preventDefault()}>
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
                            <img src={user.avatarUrl} alt='profileAvatar'/>
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
                    <button 
                        className={(user.firstname === values.firstname || errors.firstname) ? 'button disabled' : 'button'} 
                        type='button'
                        onClick={async () => !errors.firstname && updateUser('firstname', values.firstname)}
                    >
                        {firstnameLoading ? 'Loading...' : 'Update'}
                        
                    </button>
                </div>
                <div className='input'>
                    <TextInput 
                        name='lastname'
                        placeholder='Last Name'
                    />
                    <i className="fa fa-user"></i>
                    <button 
                        id='updtbutton'
                        className={(user.lastname === values.lastname || errors.lastname) ? 'button disabled' : 'button'} 
                        type='button'
                        onClick={async () => !errors.lastname && updateUser('lastname', values.lastname)}
                    >
                        {lastnameLoading ? 'Loading...' : 'Update'}
                        
                    </button>
                </div>
                <div className='error'>
                    {error}
                </div>
            </form> 
            )
        }}
    </Formik>
</div>
</>
)
}
