import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../statics/Side-nav/SideNav';
import TopNav from '../statics/Top-nav/TopNav';

const Admin = () => {
  return (
    <>
        <TopNav />
        <SideNav />
    </>
  )
}

export default Admin