import React, {useState, useContext} from 'react'
import {database, auth, storage} from '../firebase/firebase'

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ( {children} ) => {
    const [userData, setUserData] = useState();
    const [userDataLoading, setUserDataLoading] = useState(false);
    const [userDataError, setUserError] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [firstnameLoading, setFirstnameLoading] = useState(false)
    const [lastnameLoading, setLastnameLoading] = useState(false)
    const [avatarLoading, setAvatarLoading] = useState(false)

    const fetchUserData = async () => {
        setUserDataLoading(true);
        setUserError(false);
        const id = auth.currentUser.uid;
        const userRef = database.ref('/users')
        try {
            await userRef.on('value', snap => {
                if (snap.child(id).exists()) {
                    let user = snap.child(id).val();
                    setUserData(user);
                }else{
                    setUserError('Something wrong happened with our database, please contact our support.')
                    setUserDataLoading(false)
                }
            })
            setUserDataLoading(false)
        } catch(e) {
            setUserDataLoading(false);
            setUserError(e.message + ' Please contact our support.')
            console.log(e.meesage);
        }
    }
    const updateUser = async (type, data) => {
        const id = auth.currentUser.uid;
        const userRef = database.ref('/users/'+id);
        const storageRef = storage.ref('avatars/'+id);
        try {
            if (type === 'firstname') {
                //FIRSTNAME
                setFirstnameLoading(true);
                await userRef.update({firstname:data.trim()})
                setFirstnameLoading(false);
            }else if(type==='lastname'){
                //LASTNAME
                setLastnameLoading(true);
                await userRef.update({lastname:data.trim()})
                setLastnameLoading(false);
            }else if(type ==='avatar'){
                //AVATAR
                setAvatarLoading(true);
                await storageRef.put(data);
                const avatarUrl = await storageRef.getDownloadURL();
                await userRef.update({avatarUrl})
                setAvatarLoading(false);
            }
        } catch (e) {
            setUploadError(e.meesage)
            console.log(e.message);
        }
    }
    //AVATAR PHOTO VALIDATION
    const validateAvatar = (file) => {
        if (file) {
            const fileType = file.type.split('/').pop().toLowerCase();

            let error = false;
            //FORMAT
            if (fileType !== "jpeg" && fileType !== "jpg" && fileType !== "png" && fileType !=="gif"){
                error = true;
                setUploadError('Please upload jpg, jpeg, png or gif image format')
            }
            //SIZE
            if (file.size>512000) {
                error = true;
                setUploadError('Max upload file size is 512kb')
            }
            //IF COMPATIBLE - UPLOAD
            if (!error) {
                updateUser('avatar', file)
                setUploadError(false);
            }
        }
    }
    const value = {
        fetchUserData,
        setUserData,
        userData,
        updateUser,
        validateAvatar,
        uploadError,
        setUploadError,
        firstnameLoading,
        lastnameLoading,
        avatarLoading,
        userDataError,
        userDataLoading
    }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
