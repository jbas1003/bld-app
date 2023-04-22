import 'flowbite';
import 'flowbite-datepicker';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from './routes/Admin.jsx';
import Dashboard from './views/Admin-dashboard/Dashboard/Dashboard';
import {Login} from './views/Login/Login.jsx';
import Config from './views/Admin-dashboard/Config/Config.jsx';
import Attendance from './views/Admin-dashboard/Attendance/Attendance.jsx';

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Login />}>
              <Route index path='/login' element={<Login />}/>
          </Route>

          <Route path='/admin' element={<Admin />}>
            <Route index path='/admin/dashboard' element={<Dashboard />}/>
            <Route path='/admin/attendance' element={<Attendance />}/>
            <Route path='/admin/config' element={<Config />}/>
          </Route>
      </Routes>
    </>
  );
}

export default App;
