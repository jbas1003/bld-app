import 'flowbite';
import 'flowbite-datepicker';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from './routes/Admin.jsx';
import Dashboard from './views/Admin-dashboard/Dashboard/Dashboard';
import Participants from './views/Admin-dashboard/Participants/Participants';
import {Login} from './views/Login/Login.jsx';
import Config from './views/Admin-dashboard/Config/Config.jsx';
import SinglesEncounter from './views/Admin-dashboard/SinglesEncounter/SinglesEncounter.jsx';

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Login />}>
              <Route index path='/login' element={<Login />}/>
          </Route>

          <Route path='/admin' element={<Admin />}>
            <Route index path='/admin/dashboard' element={<Dashboard />}/>
            <Route path='/admin/participants' element={<Participants />}/>
            <Route path='/admin/singles_encounter' element={<SinglesEncounter />}/>
            <Route path='/admin/config' element={<Config />}/>
          </Route>
      </Routes>
    </>
  );
}

export default App;
