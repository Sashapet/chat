import React from 'react'
import {Formik} from 'formik'
import { useAuth } from '../../context/AuthContext'
import { loginSchema } from '../../validations/validations'
import TextInput from '../Inputs/TextInput'
import {useHistory, Redirect} from 'react-router-dom'
import Button from '../../style/components/Button'
import Text from '../../style/components/Text'
import ErrorWrapper from '../../style/components/Wrappers/ErrorWrapper'

const Login = () => {
const {signIn, loginState, currentUser} = useAuth();
const history = useHistory();

if(currentUser){
    return <Redirect to='/' />
}

return (
<div className='login-container'> 
	<div className='login-title'>
        <Text login>USER LOGIN</Text>
        <div className='line'></div>
	</div>
	<div className='login-card'>
		<Formik 
            initialValues={{
                email : "",
                password : ""
            }} 
        onSubmit={async (data) => {await signIn(data.email, data.password); history.push('/')}}
        validationSchema = {loginSchema} 
		>
		{({
			handleSubmit,
            errors,
            touched,
		})=>{ 
            let error;
            if (loginState.error) {
                error = <Text error>{loginState.error}</Text>;
            } else if (errors.email && touched.email) {
                    error = <Text error>{errors.email}</Text>;
            } else if (errors.password && touched.password) {
                error = <Text error>{errors.password}</Text>; 
            }
		    return(
			    <form onSubmit={handleSubmit}>
                    <ErrorWrapper>
                        {error}
		            </ErrorWrapper>
                    <div className='input'>
                        <TextInput
                            name='email'
                            placeholder='Email'
                        />
                        <i className="fa fa-user"></i>
                    </div>
                    <div className='input'>
                        <TextInput 
                            name='password'
                            placeholder='Password'
                            type='password'
                            autoComplete = "on"
                        />
                        <i className="fas fa-lock"></i>
                    </div>
                    <Button
                            login
                            type='submit' 
                            style={{pointerEvents: loginState.loading ? 'none' : 'visible'}} 
                    >
                    {loginState.loading ? 'Loading...' : 'LOGIN'}
                    </Button>
				</form>
			)
		}}
		</Formik>
	</div>
</div>
    )
}
export default Login;