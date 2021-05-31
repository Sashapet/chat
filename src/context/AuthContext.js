import React, {useContext, useState, useEffect} from 'react'
import { auth } from '../firebase/firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext);
}   

export const AuthProvider = ( {children} ) => {

    const [currentUser, setCurrentUser] = useState();
    const [isAuthenticating, setIsAuthenticating] = useState(true)
    const [loginState, setLoginState] = useState({
        error:null,
        loading:false
    })
    //LISTENING FOR USER CHANGE
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setIsAuthenticating(false);
        })
        return () => unsubscribe();
    }, [])
    //SIGN
    const signIn = async (email, password) => {
        //LOADING START
        setLoginState({error:null, loading:true})
        try {
            await auth.signInWithEmailAndPassword(email, password);
            //LOADING END
            setLoginState({...loginState, loading:false})
        } catch(e) {
            //ERR
            if (e.code === 'auth/user-not-found') {
                let error = 'There is no user corresponding to this email and password'
                setLoginState({error, loading:false})
            }else{
                setLoginState({error:e.message, loading:false})
            }
        }
    }
    //LOGOUT
    const logOut = async () => {
        await auth.signOut();
    }   

    const value = {
        currentUser,
        loginState,
        signIn,
        setLoginState,
        logOut,
        setCurrentUser,
        isAuthenticating
    }
    return (
        <AuthContext.Provider value = {value}>
            {!isAuthenticating && children}
        </AuthContext.Provider>
    )
}
