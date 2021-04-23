import React, {useState, useEffect} from 'react'
import {useConverse} from '../../../context/ConverseContext'
import DropDown from './DropDown'
import Contacts from './Contacts'

export default function ContactBoard({user}) {
    const [dropdown, setDropDown] = useState(false);
    const [iconActive, setIcon] = useState(false);
    const {fetchConvers} = useConverse();
    useEffect(() => {
        fetchConvers();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='contacts-container'>
            <div className='profile' >
                <div 
                    className={dropdown ? 'open profile-container' : 'profile-container'}
                    onClick={()=>setDropDown(!dropdown)}
                    onMouseOver={()=>setIcon(true)}
                    onMouseOut={()=>setIcon(false)}
                >
                    <DropDown 
                        user={user} 
                        dropdown={dropdown} 
                        iconActive={iconActive}
                    />
                </div>
            </div>
            <div className='search'>
                <input type='text' placeholder='Search' />
            </div>
            <div className='contacts'>
                <Contacts />
            </div>
        </div>
    )
}
