import React from 'react';
import '../style/style.css'
import {useAuth} from '../context/AuthContext';
import {useDashboard} from '../context/DashboardContext';
import Routes from '../components/Routing/Routes'
import Text from '../style/components/Text'
import Button from '../style/components/Button'

const App = () => {
  const {currentUser, logOut} = useAuth();
  const {setShowProfile, setShowChat} = useDashboard();
  return (
      <div className="app">
        <div className='app-container'>
          <div className='nav-container'>
            <Text friend italic>ChatApp</Text>
            {currentUser !==null && 
                <Button logout onClick={()=>{logOut(); setShowProfile(false); setShowChat(true)}}>Log Out</Button>
            }
          </div>
          <Routes />
        </div>
      </div>
  );
}

export default App;
