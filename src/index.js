import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './components/App';
import {BrowserRouter as Router} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext'
import { MessageProvider } from './context/MessageContext'
import { ConverseProvider } from './context/ConverseContext'
import { DashboardProvider } from './context/DashboardContext'

ReactDOM.render(
  <Router>
    <AuthProvider>
      <UserProvider>
        <DashboardProvider>
          <ConverseProvider>
            <MessageProvider>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </MessageProvider>
          </ConverseProvider>
        </DashboardProvider>
      </UserProvider>
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);
reportWebVitals();
