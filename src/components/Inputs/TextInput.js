import React from 'react'
import { useField } from 'formik';
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import Input from '../../style/components/Input'

const TextInput = (props) => {
    const [field] = useField(props.name);
    const {loginState, setLoginState} = useAuth();
    const {setUploadError} = useUser();
    return (
            <Input
                login
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