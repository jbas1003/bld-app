import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import SideNav from '../statics/Side-nav/SideNav';
import TopNav from '../statics/Top-nav/TopNav';
import useAuthContext from '../utils/AuthContext';

const Admin = () => {
  const { loginResult } = useAuthContext();
  return loginResult ? (
    <>
        <TopNav />
        <SideNav />
        <div className="p-4 sm:ml-64">
          <div className="p-4 mt-14">
            <Outlet />
          </div>
        </div>
    </>
  )
  : <Navigate to="/login" />
}

export default Admin