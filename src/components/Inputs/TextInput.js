import React from 'react'
import { useField } from 'formik';
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'

const TextInput = (props) => {
    const [field] = useField(props.name);
    const {loginState, setLoginState} = useAuth();
    const {setUploadError} = useUser();
    return (
            <input
                {...field}
                {...props}
                // CLEANING BACKEND ERROR ON FOCUS
                onFocus={()=>{
                    field.name === 'firstname' || field.name === 'lastname' ?
                    setUploadError(false) :
                    setLoginState({...loginState, error:null});
                }}
            />  
    )
}
export default TextInput;