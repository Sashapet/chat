import React from 'react'
import {Formik} from 'formik'
import { useAuth } from '../../context/AuthContext'
import { loginSchema } from '../../validations/validations'
import TextInput from '../Inputs/TextInput'

export default function Login() {
const {signIn, loginState} = useAuth();

return (
<div className='login-container'> 
	<div className='login-title'>
        <h3>USER LOGIN</h3>
        <div className='line'></div>
	</div>
	<div className='login-card'>
		<Formik 
            initialValues={{
                email : "",
                password : ""
            }} 
        onSubmit={async (data) => await signIn(data.email, data.password)}
        validationSchema = {loginSchema} 
		>
		{({
			handleSubmit,
            errors,
            touched,
		})=>{ 
            let error;
            if (loginState.error) {
                error = <h2>{loginState.error}</h2>;
            } else if (errors.email && touched.email) {
                    error = <h2>{errors.email}</h2>;
            } else if (errors.password && touched.password) {
                error = <h2>{errors.password}</h2>; 
            }
		    return(
			    <form onSubmit={handleSubmit}>
                    <div className='error'>
                        {error}
		            </div>
                    <div className='input'>
                        <TextInput
                            name='email'
                            placeholder='Email'
                        />
                    </div>
                    <div className='input'>
                        <TextInput 
                            name='password'
                            placeholder='Password'
                            type='password'
                            autoComplete = "on"
                        />
                    </div>
                    <div className='button' onClick={()=>console.log('yes')}>
                        <input type='submit' 
                            style={{pointerEvents: loginState.loading ? 'none' : 'visible'}} 
                            value={loginState.loading ? 'Loading...' : 'LOGIN'} 
                        />
                    </div> 
				</form>
			)
		}}
		</Formik>
	</div>
</div>
    )
}
