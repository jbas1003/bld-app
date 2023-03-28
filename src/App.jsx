import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from './views/Admin-dashboard/Admin';
import Dashboard from './views/Admin-dashboard/Dashboard/Dashboard';
import Participants from './views/Admin-dashboard/Participants/Participants';
import Login from './views/Login/Login';


function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Login />}>
              <Route index path='/login' element={<Login />}/>
          </Route>

          <Route path='/admin' element={<Admin />}>
            <Route path='/admin/dashboard' index element={<Dashboard />}/>
            <Route path='/admin/participants' element={<Participants />}/>
          </Route>
      </Routes>
    </>
  );
}

export default App;
