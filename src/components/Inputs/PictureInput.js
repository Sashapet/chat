import React from 'react'
import {useField} from 'formik';
import { useUser } from '../../context/UserContext'

const PictureInput = (props) => {
    const [field] = useField(props.name);
    const {validateAvatar} = useUser();
    return (
        <input 
            {...field}
            {...props}
            //FORMIK DOESN'T SUPPORT FILE UPLOAD, IMPLEMENTED MANUALLY.
            onChange={(e)=>validateAvatar(e.target.files[0])} 
        /> 
    )
}
export default PictureInput;