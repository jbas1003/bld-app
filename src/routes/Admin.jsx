import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../statics/Side-nav/SideNav';
import TopNav from '../statics/Top-nav/TopNav';

const Admin = () => {
  return (
    <>
        <TopNav />
        <SideNav />
        <div className="p-4 sm:ml-64">
          <div class="p-4 mt-14">
            <Outlet />
          </div>
        </div>
    </>
  )
}

export default Admin