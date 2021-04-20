import React from 'react';
import '../css/style.css'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'
import PageNotFound from './PageNotFound'
import {Route, Switch} from "react-router-dom";
import {useAuth} from '../context/AuthContext';
function App() {
  const {currentUser} = useAuth();
  let routes;
  if (currentUser) {
      routes = (
        <Switch>
          <Route path='/' component={Dashboard} />
          <Route component={PageNotFound} />
        </Switch>
      )
  } else if (currentUser === null){
    routes = (
    <Switch>
      <Route path='/' component={Login} />
      <Route component={PageNotFound} />
    </Switch>
    )
  }

  return (
      <div className="app">
        <div className='app-container'>
          <div className='nav-container'>
            <h1>ChatApp</h1>
          </div>
          {routes}
        </div>
      </div>
  );
}

export default App;
